import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CashService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cashMovement.findMany({ orderBy: { time: 'desc' } });
  }

  create(data: any) {
    return this.prisma.cashMovement.create({ data });
  }

  async summary() {
    const movements = await this.prisma.cashMovement.findMany();
    const sales    = movements.filter(m => m.type === 'sale').reduce((s, m) => s + m.amount, 0);
    const income   = movements.filter(m => m.type === 'in').reduce((s, m) => s + m.amount, 0);
    const expense  = movements.filter(m => m.type === 'out').reduce((s, m) => s + m.amount, 0);
    return { sales, income, expense, total: sales + income - expense };
  }
}