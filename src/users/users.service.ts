import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: { id:true, name:true, email:true, role:true, isActive:true, createdAt:true },
    });
  }

  async create(data: { name: string; email: string; password: string; role: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashed },
      select: { id:true, name:true, email:true, role:true, isActive:true },
    });
  }

  update(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id:true, name:true, email:true, role:true, isActive:true },
    });
  }

  remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: { id:true, name:true, isActive:true },
    });
  }
}