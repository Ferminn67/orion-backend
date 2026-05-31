import { Controller, Get, Patch, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TablesService } from './tables.service';

@Controller('tables')
@UseGuards(AuthGuard('jwt'))
export class TablesController {
  constructor(private tables: TablesService) {}

  @Get()    findAll()                            { return this.tables.findAll(); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.tables.update(id, body); }
  @Post(':id/open') open(@Param('id') id: string, @Body() body: any) {
    return this.tables.open(id, body.waiter, body.guestCount);
  }
  @Post(':id/close') close(@Param('id') id: string) { return this.tables.close(id); }
}