import {
  WebSocketGateway, WebSocketServer,
  SubscribeMessage, MessageBody, ConnectedSocket,
  OnGatewayConnection, OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
    ],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients = new Map<string, { role: string; name: string }>();

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    console.log(`Cliente desconectado: ${client.id}`);
    this.server.emit('users:online', this.getOnlineUsers());
  }

  @SubscribeMessage('user:join')
  handleJoin(
    @MessageBody() data: { role: string; name: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.clients.set(client.id, data);
    client.join(`role:${data.role}`);
    this.server.emit('users:online', this.getOnlineUsers());
    console.log(`${data.name} (${data.role}) se unio al sistema`);
  }

  emitOrderCreated(order: any) {
    this.server.emit('order:created', order);
    this.server.to('role:kitchen').emit('kitchen:new_order', order);
  }

  emitOrderUpdated(order: any) {
    this.server.emit('order:updated', order);
    if (order.status === 'ready') {
      this.server.to('role:cashier').emit('order:ready', order);
      this.server.to('role:waiter').emit('order:ready', order);
      this.server.to('role:admin').emit('order:ready', order);
    }
  }

  emitOrderPaid(order: any) {
    this.server.emit('order:paid', order);
  }

  emitTableUpdated(table: any) {
    this.server.emit('table:updated', table);
  }

  emitKitchenAck(order: any) {
    this.server.emit('kitchen:ack', order);
  }

  emitKitchenReady(order: any) {
    this.server.emit('kitchen:ready', order);
    this.server.to('role:waiter').emit('kitchen:ready', order);
    this.server.to('role:cashier').emit('kitchen:ready', order);
    this.server.to('role:admin').emit('kitchen:ready', order);
  }

  emitNotification(notif: any) {
    this.server.emit('notification', notif);
  }

  emitInventoryUpdate(ingredients: any[]) {
    this.server.emit('inventory:updated', ingredients);
  }

  private getOnlineUsers() {
    return Array.from(this.clients.entries()).map(([id, data]) => ({
      id, ...data,
    }));
  }
}