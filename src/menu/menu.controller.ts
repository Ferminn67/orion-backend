import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menu: MenuService) {}

  @Get()    findAll()                             { return this.menu.findAll(); }
  @Get(':id') findOne(@Param('id') id: string)   { return this.menu.findOne(id); }

  @UseGuards(AuthGuard('jwt'))
  @Post()   create(@Body() body: any)             { return this.menu.create(body); }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.menu.update(id, body); }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id') remove(@Param('id') id: string) { return this.menu.remove(id); }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/toggle') toggle(@Param('id') id: string, @Body() body: any) {
    return this.menu.toggle(id, body.available);
  }
}