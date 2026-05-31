import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()    findAll()                               { return this.users.findAll(); }
  @Post()   create(@Body() body: any)               { return this.users.create(body); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.users.update(id, body); }
  @Delete(':id') remove(@Param('id') id: string)   { return this.users.remove(id); }
}