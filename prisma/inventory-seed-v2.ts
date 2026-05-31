import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedInventory() {
  console.log('Actualizando inventario...');

  // Clear and recreate
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();

  const ingredients = [
    { name:'Masa de pizza',        unit:'unidad', stock:50, minStock:10, cost:40,  category:'Masas',     emoji:'&#127855;' },
    { name:'Salsa de tomate',      unit:'oz',     stock:200,minStock:50, cost:5,   category:'Salsas',    emoji:'&#127813;' },
    { name:'Queso Mozzarella',     unit:'oz',     stock:150,minStock:30, cost:18,  category:'Lacteos',   emoji:'&#129472;' },
    { name:'Pepperoni',            unit:'oz',     stock:100,minStock:20, cost:22,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Jamon',               unit:'oz',     stock:100,minStock:20, cost:15,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Maiz',                unit:'oz',     stock:80, minStock:20, cost:8,   category:'Vegetales', emoji:'&#127807;' },
    { name:'Tocineta',            unit:'oz',     stock:80, minStock:15, cost:25,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Salchicha Italiana',   unit:'oz',     stock:80, minStock:15, cost:28,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Queso Gouda',         unit:'oz',     stock:60, minStock:10, cost:30,  category:'Lacteos',   emoji:'&#129472;' },
    { name:'Queso Parmesano',     unit:'oz',     stock:60, minStock:10, cost:32,  category:'Lacteos',   emoji:'&#129472;' },
    { name:'Queso Cheddar',       unit:'oz',     stock:60, minStock:10, cost:28,  category:'Lacteos',   emoji:'&#129472;' },
    { name:'Pollo',               unit:'oz',     stock:80, minStock:15, cost:20,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Vegetales mixtos',    unit:'oz',     stock:60, minStock:15, cost:12,  category:'Vegetales', emoji:'&#127822;' },
    { name:'Agua botella',        unit:'unidad', stock:48, minStock:12, cost:15,  category:'Bebidas',   emoji:'&#128167;' },
    { name:'Refresco',            unit:'unidad', stock:48, minStock:12, cost:35,  category:'Bebidas',   emoji:'&#127864;' },
    { name:'Jugo Natural',        unit:'unidad', stock:24, minStock:6,  cost:40,  category:'Bebidas',   emoji:'&#129389;' },
    { name:'Cajas pizza',         unit:'unidad', stock:100,minStock:20, cost:28,  category:'Empaques',  emoji:'&#128230;' },
  ];

  const ids: Record<string,string> = {};
  for (const ing of ingredients) {
    const r = await prisma.ingredient.create({ data: ing });
    ids[ing.name] = r.id;
    console.log(`Ingrediente: ${ing.name}`);
  }

  console.log('Creando recetas...');

  const recipes = [
    // Pedazos clasicos
    { m:'Pedazo Pepperoni',          i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni'],        q:[0.1,0.5,0.7,0.5] },
    { m:'Pedazo Jamon y Queso',      i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Jamon'],           q:[0.1,0.5,0.7,0.5] },
    { m:'Pedazo Queso y Maiz',       i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Maiz'],            q:[0.1,0.5,0.7,0.3] },
    // Clasicas 10pz
    { m:'Pizza Pepperoni',           i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni','Cajas pizza'],       q:[1,3,4,3,1] },
    { m:'Pizza Jamon y Queso',       i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Jamon','Cajas pizza'],          q:[1,3,4,3,1] },
    { m:'Pizza Queso y Maiz',        i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Maiz','Cajas pizza'],           q:[1,3,4,2,1] },
    // Personales
    { m:'Personal Pepperoni',        i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni'],       q:[0.4,1,1.5,1.5] },
    { m:'Personal Jamon y Queso',    i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Jamon'],          q:[0.4,1,1.5,1.5] },
    { m:'Personal Queso y Maiz',     i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Maiz'],           q:[0.4,1,1.5,1] },
    // Pedazos especiales
    { m:'Pedazo Tocineta y Queso',   i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Tocineta'],       q:[0.1,0.5,0.7,0.5] },
    { m:'Pedazo Salchicha Italiana', i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Salchicha Italiana'], q:[0.1,0.5,0.7,0.5] },
    { m:'Pedazo Vegetales',          i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Vegetales mixtos'],q:[0.1,0.5,0.7,0.5] },
    // Especiales 10pz
    { m:'Pizza Tocineta y Queso',    i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Tocineta','Cajas pizza'],      q:[1,3,4,3,1] },
    { m:'Pizza Salchicha Italiana',  i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Salchicha Italiana','Cajas pizza'],q:[1,3,4,3,1] },
    { m:'Pizza Vegetales',           i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Vegetales mixtos','Cajas pizza'],q:[1,3,4,3,1] },
    // Especiales personales
    { m:'Personal Tocineta y Queso', i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Tocineta'],       q:[0.4,1,1.5,1.5] },
    { m:'Personal Salchicha It.',    i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Salchicha Italiana'],q:[0.4,1,1.5,1.5] },
    { m:'Personal Vegetales',        i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Vegetales mixtos'],q:[0.4,1,1.5,1.5] },
    // Premium
    { m:'La Doble',                  i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni','Cajas pizza'],      q:[1,3,6,5,1] },
    { m:'La Contagiosa',             i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni','Jamon','Maiz','Cajas pizza'], q:[1,3,4,2,2,2,1] },
    { m:'Especial de Carne',         i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni','Jamon','Tocineta','Salchicha Italiana','Cajas pizza'], q:[1,3,4,2,2,2,2,1] },
    { m:'La Irresistible',           i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni','Salchicha Italiana','Cajas pizza'], q:[1,3,4,3,3,1] },
    { m:'La Triple',                 i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni','Cajas pizza'],      q:[1,2,6,4,1] },
    { m:'La Suprema',               i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni','Jamon','Tocineta','Salchicha Italiana','Maiz','Cajas pizza'], q:[1,3,3,2,2,2,2,2,1] },
    { m:'4 Quesos',                  i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Queso Gouda','Queso Parmesano','Queso Cheddar','Cajas pizza'], q:[1,2,2,2,2,2,1] },
    { m:'La Supersuprema',           i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pepperoni','Jamon','Tocineta','Salchicha Italiana','Maiz','Vegetales mixtos','Cajas pizza'], q:[1,3,3,2,2,2,2,2,2,1] },
    { m:'La Consentida',             i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pollo','Vegetales mixtos','Tocineta','Cajas pizza'], q:[1,3,4,3,2,2,1] },
    { m:'Especial de Ricardos',      i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pollo','Salchicha Italiana','Tocineta','Jamon','Pepperoni','Maiz','Vegetales mixtos','Cajas pizza'], q:[1,3,3,3,2,2,2,2,2,2,1] },
    { m:'Pizza de Pollo',            i:['Masa de pizza','Salsa de tomate','Queso Mozzarella','Pollo','Cajas pizza'], q:[1,3,4,4,1] },
    // Bebidas
    { m:'Agua (botella)',            i:['Agua botella'],  q:[1] },
    { m:'Refresco 16oz',             i:['Refresco'],      q:[1] },
    { m:'Refresco 1 litro',          i:['Refresco'],      q:[1] },
    { m:'Refresco 2 litros',         i:['Refresco'],      q:[2] },
    { m:'Jugo Natural',              i:['Jugo Natural'],  q:[1] },
  ];

  for (const r of recipes) {
    for (let idx=0; idx<r.i.length; idx++) {
      const ingredientId = ids[r.i[idx]];
      if (!ingredientId) { console.log(`Skip: ${r.i[idx]}`); continue; }
      await prisma.recipe.create({
        data: { menuItemName: r.m, ingredientId, quantity: r.q[idx] }
      });
    }
    console.log(`Receta: ${r.m}`);
  }

  console.log('\nInventario y recetas actualizados!');
}

seedInventory()
  .catch(console.error)
  .finally(() => prisma.$disconnect());