import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InventoryService } from './inventory.service';

@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
export class InventoryController {
  constructor(private inv: InventoryService) {}

  @Get()              findAll()                              { return this.inv.findAll(); }
  @Post()             create(@Body() b: any)                 { return this.inv.create(b); }
  @Patch(':id')       update(@Param('id') id: string, @Body() b: any) { return this.inv.update(id, b); }
  @Delete(':id')      remove(@Param('id') id: string)        { return this.inv.remove(id); }
  @Get('low-stock')   lowStock()                             { return this.inv.getLowStock(); }
  @Get('recipes')     findRecipes()                          { return this.inv.findRecipes(); }
  @Post('recipes')    createRecipe(@Body() b: any)           { return this.inv.createRecipe(b); }
  @Delete('recipes/:id') deleteRecipe(@Param('id') id: string) { return this.inv.deleteRecipe(id); }
}
