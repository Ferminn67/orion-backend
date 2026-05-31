import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Get()      findAll()                                           { return this.orders.findAll(); }
  @Get(':id') findOne(@Param('id') id: string)                   { return this.orders.findOne(id); }
  @Post()     create(@Body() body: any)                          { return this.orders.create(body); }
  @Patch(':id') update(@Param('id') id: string, @Body() b: any) { return this.orders.update(id, b); }
  @Delete(':id') remove(@Param('id') id: string)                 { return this.orders.remove(id); }
  @Post(':id/pay')   pay(@Param('id') id: string, @Body() b: any) { return this.orders.pay(id, b.method); }
  @Post(':id/ack')   ack(@Param('id') id: string)                { return this.orders.ackKitchen(id); }
  @Post(':id/ready') ready(@Param('id') id: string)              { return this.orders.markReady(id); }
}