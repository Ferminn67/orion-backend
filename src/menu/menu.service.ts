import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  findAll()              { return this.prisma.menuItem.findMany({ orderBy: { category: 'asc' } }); }
  findOne(id: string)    { return this.prisma.menuItem.findUnique({ where: { id } }); }
  create(data: any)      { return this.prisma.menuItem.create({ data }); }
  update(id: string, data: any) { return this.prisma.menuItem.update({ where: { id }, data }); }
  remove(id: string)     { return this.prisma.menuItem.delete({ where: { id } }); }
  toggle(id: string, available: boolean) { return this.prisma.menuItem.update({ where: { id }, data: { available } }); }
}