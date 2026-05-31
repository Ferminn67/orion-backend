import { Controller, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';

@Controller('system')
@UseGuards(AuthGuard('jwt'))
export class ResetController {
  constructor(private prisma: PrismaService) {}

  @Delete('reset')
  async resetAll() {
    await this.prisma.cashMovement.deleteMany();
    await this.prisma.notification.deleteMany();
    await this.prisma.orderItem.deleteMany();
    await this.prisma.order.deleteMany();
    await this.prisma.table.updateMany({
      data: {
        status: 'available',
        waiter: null,
        guestCount: null,
        openedAt: null,
      },
    });
    await this.prisma.ingredient.updateMany({
      data: { stock: 100 },
    }).catch(() => {});
    return { success: true, message: 'Sistema reiniciado correctamente' };
  }
}