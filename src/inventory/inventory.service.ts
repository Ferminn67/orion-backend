import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.ingredient.findMany({ orderBy: { name: 'asc' } });
  }

  create(data: any) {
    return this.prisma.ingredient.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.ingredient.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.ingredient.delete({ where: { id } });
  }

  // Deduct stock based on order items
  async deductForOrder(items: { name: string; qty: number }[]) {
    for (const item of items) {
      const recipes = await this.prisma.recipe.findMany({
        where: { menuItemName: item.name },
        include: { ingredient: true },
      });
      for (const recipe of recipes) {
        const deduct = recipe.quantity * item.qty;
        await this.prisma.ingredient.update({
          where: { id: recipe.ingredientId },
          data: { stock: { decrement: deduct } },
        });
      }
    }
  }

  // Get low stock alerts
  async getLowStock() {
    return this.prisma.ingredient.findMany({
      where: { stock: { lte: this.prisma.ingredient.fields.minStock } },
    });
  }

  findRecipes() {
    return this.prisma.recipe.findMany({ include: { ingredient: true } });
  }

  createRecipe(data: any) {
    return this.prisma.recipe.create({ data });
  }

  deleteRecipe(id: string) {
    return this.prisma.recipe.delete({ where: { id } });
  }
}