import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CashService } from './cash.service';

@Controller('cash')
@UseGuards(AuthGuard('jwt'))
export class CashController {
  constructor(private cash: CashService) {}

  @Get()          findAll()            { return this.cash.findAll(); }
  @Get('summary') summary()            { return this.cash.summary(); }
  @Post()         create(@Body() b: any) { return this.cash.create(b); }
}