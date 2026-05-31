import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  findAll() { return this.prisma.table.findMany({ orderBy: { number: 'asc' } }); }

  update(id: string, data: any) {
    return this.prisma.table.update({ where: { id }, data });
  }

  async open(id: string, waiter: string, guestCount: number) {
    return this.prisma.table.update({
      where: { id },
      data: { status: 'occupied', waiter, guestCount, openedAt: new Date() },
    });
  }

  async close(id: string) {
    return this.prisma.table.update({
      where: { id },
      data: { status: 'cleaning', waiter: null, guestCount: null, openedAt: null },
    });
  }
}