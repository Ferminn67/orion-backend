import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { MenuModule } from './menu/menu.module';
import { TablesModule } from './tables/tables.module';
import { CashModule } from './cash/cash.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ResetModule } from './reset/reset.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    OrdersModule,
    MenuModule,
    TablesModule,
    CashModule,
    UsersModule,
    EventsModule,
    ResetModule,
    InventoryModule,
  ],
})
export class AppModule {}