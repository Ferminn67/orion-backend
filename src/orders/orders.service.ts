import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private events: EventsGateway,
  ) {}

  private async deductInventory(items: any[]) {
    for (const item of items) {
      const recipes = await this.prisma.recipe.findMany({
        where: { menuItemName: item.name },
        include: { ingredient: true },
      });
      for (const recipe of recipes) {
        const deduct = recipe.quantity * (item.qty || 1);
        await this.prisma.ingredient.updateMany({
          where: { id: recipe.ingredientId, stock: { gt: 0 } },
          data: { stock: { decrement: deduct } },
        }).catch(() => {}); // ignore if ingredient not found
      }
    }
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: { items: true, table: true },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map(o => this.formatOrder(o));
  }

  async findOne(id: string) {
    const o = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true, table: true },
    });
    return o ? this.formatOrder(o) : null;
  }

  private formatOrder(o: any) {
    return {
      ...o,
      table: o.table?.number ?? null,
      tableId: o.tableId,
    };
  }

  async create(data: any) {
    const { items, tableId, tableNumber, ...orderData } = data;

    // Resolve tableId: accept UUID directly or find by number
    let resolvedTableId = tableId || null;
    if (!resolvedTableId && tableNumber) {
      const t = await this.prisma.table.findFirst({ where: { number: tableNumber } });
      resolvedTableId = t?.id || null;
    }

    const order = await this.prisma.order.create({
      data: {
        ...orderData,
        tableId: resolvedTableId,
        items: { create: items },
      },
      include: { items: true, table: true },
    });

    // Update table status if dine-in
    if (resolvedTableId) {
      await this.prisma.table.update({
        where: { id: resolvedTableId },
        data: { status: 'occupied', openedAt: new Date() },
      });
    }

    const formatted = this.formatOrder(order);
    this.events.emitOrderCreated(formatted);
    this.events.emitNotification({
      type: 'new_order',
      message: `Nueva orden #${order.num}${order.table ? ` - Mesa ${order.table.number}` : ''}`,
      orderId: order.id,
      time: new Date(),
    });
    return formatted;
  }

  async update(id: string, data: any) {
    const order = await this.prisma.order.update({
      where: { id },
      data,
      include: { items: true, table: true },
    });
    const formatted = this.formatOrder(order);
    this.events.emitOrderUpdated(formatted);
    return formatted;
  }

  async ackKitchen(id: string) {
    const order = await this.prisma.order.update({
      where: { id },
      data: { kitchenAck: true, status: 'preparing' },
      include: { items: true, table: true },
    });
    const formatted = this.formatOrder(order);
    this.events.emitKitchenAck(formatted);
    this.events.emitOrderUpdated(formatted);
    return formatted;
  }

  async markReady(id: string) {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status: 'ready', readyAt: new Date() },
      include: { items: true, table: true },
    });
    const formatted = this.formatOrder(order);
    this.events.emitKitchenReady(formatted);
    this.events.emitOrderUpdated(formatted);
    this.events.emitNotification({
      type: 'order_ready',
      message: `Orden #${order.num} lista para entregar`,
      orderId: id,
      time: new Date(),
    });
    return formatted;
  }

  async pay(id: string, method: string) {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status: 'delivered', paidAt: new Date(), payMethod: method },
      include: { items: true, table: true },
    });

    // Close table
    if (order.tableId) {
      await this.prisma.table.update({
        where: { id: order.tableId },
        data: { status: 'cleaning', waiter: null, guestCount: null, openedAt: null },
      });
    }

    await this.prisma.cashMovement.create({
      data: {
        orderId: id,
        type: 'sale',
        method,
        amount: order.total,
        note: `Orden #${order.num}${order.table ? ` - Mesa ${order.table.number}` : ''}`,
      },
    });

    // Deduct inventory and broadcast update
    await this.deductInventory(order.items);

    // Emit inventory update so frontend updates in real time
    const updatedIngredients = await this.prisma.ingredient.findMany();
    this.events.emitInventoryUpdate(updatedIngredients);

    const formatted = this.formatOrder(order);
    this.events.emitOrderPaid(formatted);
    this.events.emitOrderUpdated(formatted);
    return formatted;
  }

  async remove(id: string) {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status: 'cancelled' },
      include: { items: true, table: true },
    });
    const formatted = this.formatOrder(order);
    this.events.emitOrderUpdated(formatted);
    return formatted;
  }
}