import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedInventory() {
  console.log('Creando ingredientes...');

  const ingredients = [
    { name:'Masa de pizza',        unit:'unidad', stock:50, minStock:10, cost:40,  category:'Masas',     emoji:'&#127855;' },
    { name:'Salsa de tomate',      unit:'oz',     stock:200,minStock:50, cost:5,   category:'Salsas',    emoji:'&#127813;' },
    { name:'Queso Mozzarella',     unit:'oz',     stock:150,minStock:30, cost:18,  category:'Lacteos',   emoji:'&#129472;' },
    { name:'Pepperoni',            unit:'oz',     stock:100,minStock:20, cost:22,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Jamon',                unit:'oz',     stock:100,minStock:20, cost:15,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Maiz',                 unit:'oz',     stock:80, minStock:20, cost:8,   category:'Vegetales', emoji:'&#127807;' },
    { name:'Tocineta',             unit:'oz',     stock:80, minStock:15, cost:25,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Salchicha Italiana',   unit:'oz',     stock:80, minStock:15, cost:28,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Queso Gouda',          unit:'oz',     stock:60, minStock:10, cost:30,  category:'Lacteos',   emoji:'&#129472;' },
    { name:'Queso Parmesano',      unit:'oz',     stock:60, minStock:10, cost:32,  category:'Lacteos',   emoji:'&#129472;' },
    { name:'Queso Cheddar',        unit:'oz',     stock:60, minStock:10, cost:28,  category:'Lacteos',   emoji:'&#129472;' },
    { name:'Pollo desmenuzado',    unit:'oz',     stock:80, minStock:15, cost:20,  category:'Carnes',    emoji:'&#129363;' },
    { name:'Vegetales mixtos',     unit:'oz',     stock:60, minStock:15, cost:12,  category:'Vegetales', emoji:'&#127807;' },
    { name:'Agua (botella)',       unit:'unidad', stock:48, minStock:12, cost:15,  category:'Bebidas',   emoji:'&#128167;' },
    { name:'Refresco',             unit:'unidad', stock:48, minStock:12, cost:35,  category:'Bebidas',   emoji:'&#127864;' },
  ];

  const created: Record<string, string> = {};
  for (const ing of ingredients) {
    const result = await prisma.ingredient.upsert({
      where: { name: ing.name },
      update: {},
      create: ing,
    });
    created[ing.name] = result.id;
    console.log(`Ingrediente: ${ing.name}`);
  }

  console.log('Creando recetas...');

  // Recipe: how much of each ingredient per pizza
  const recipes = [
    // Clasicas 10pz
    { menuItemName:'Pizza Pepperoni',        ingredientName:'Masa de pizza',      qty:1 },
    { menuItemName:'Pizza Pepperoni',        ingredientName:'Salsa de tomate',    qty:3 },
    { menuItemName:'Pizza Pepperoni',        ingredientName:'Queso Mozzarella',   qty:4 },
    { menuItemName:'Pizza Pepperoni',        ingredientName:'Pepperoni',          qty:3 },
    { menuItemName:'Pizza Jamon y Queso',    ingredientName:'Masa de pizza',      qty:1 },
    { menuItemName:'Pizza Jamon y Queso',    ingredientName:'Salsa de tomate',    qty:3 },
    { menuItemName:'Pizza Jamon y Queso',    ingredientName:'Queso Mozzarella',   qty:4 },
    { menuItemName:'Pizza Jamon y Queso',    ingredientName:'Jamon',              qty:3 },
    { menuItemName:'Pizza Queso y Maiz',     ingredientName:'Masa de pizza',      qty:1 },
    { menuItemName:'Pizza Queso y Maiz',     ingredientName:'Salsa de tomate',    qty:3 },
    { menuItemName:'Pizza Queso y Maiz',     ingredientName:'Queso Mozzarella',   qty:4 },
    { menuItemName:'Pizza Queso y Maiz',     ingredientName:'Maiz',               qty:2 },
    // Personales (4pz) - menos cantidad
    { menuItemName:'Personal Pepperoni',     ingredientName:'Masa de pizza',      qty:0.4 },
    { menuItemName:'Personal Pepperoni',     ingredientName:'Salsa de tomate',    qty:1 },
    { menuItemName:'Personal Pepperoni',     ingredientName:'Queso Mozzarella',   qty:1.5 },
    { menuItemName:'Personal Pepperoni',     ingredientName:'Pepperoni',          qty:1.5 },
    // Especiales
    { menuItemName:'Pizza Tocineta y Queso', ingredientName:'Masa de pizza',      qty:1 },
    { menuItemName:'Pizza Tocineta y Queso', ingredientName:'Salsa de tomate',    qty:3 },
    { menuItemName:'Pizza Tocineta y Queso', ingredientName:'Queso Mozzarella',   qty:4 },
    { menuItemName:'Pizza Tocineta y Queso', ingredientName:'Tocineta',           qty:3 },
    { menuItemName:'Pizza Salchicha Italiana',ingredientName:'Masa de pizza',     qty:1 },
    { menuItemName:'Pizza Salchicha Italiana',ingredientName:'Salsa de tomate',   qty:3 },
    { menuItemName:'Pizza Salchicha Italiana',ingredientName:'Queso Mozzarella',  qty:4 },
    { menuItemName:'Pizza Salchicha Italiana',ingredientName:'Salchicha Italiana',qty:3 },
    { menuItemName:'Pizza 4 Quesos',         ingredientName:'Masa de pizza',      qty:1 },
    { menuItemName:'Pizza 4 Quesos',         ingredientName:'Salsa de tomate',    qty:2 },
    { menuItemName:'Pizza 4 Quesos',         ingredientName:'Queso Mozzarella',   qty:3 },
    { menuItemName:'Pizza 4 Quesos',         ingredientName:'Queso Gouda',        qty:2 },
    { menuItemName:'Pizza 4 Quesos',         ingredientName:'Queso Cheddar',      qty:2 },
    // Premium
    { menuItemName:'La Suprema',             ingredientName:'Masa de pizza',      qty:1 },
    { menuItemName:'La Suprema',             ingredientName:'Salsa de tomate',    qty:3 },
    { menuItemName:'La Suprema',             ingredientName:'Queso Mozzarella',   qty:3 },
    { menuItemName:'La Suprema',             ingredientName:'Pepperoni',          qty:2 },
    { menuItemName:'La Suprema',             ingredientName:'Jamon',              qty:2 },
    { menuItemName:'La Suprema',             ingredientName:'Tocineta',           qty:2 },
    { menuItemName:'La Suprema',             ingredientName:'Salchicha Italiana', qty:2 },
    { menuItemName:'La Suprema',             ingredientName:'Maiz',               qty:1 },
    // Bebidas
    { menuItemName:'Agua (botella)',          ingredientName:'Agua (botella)',     qty:1 },
    { menuItemName:'Refresco 16oz',           ingredientName:'Refresco',          qty:1 },
    { menuItemName:'Refresco 1 litro',        ingredientName:'Refresco',          qty:1 },
    { menuItemName:'Refresco 2 litros',       ingredientName:'Refresco',          qty:2 },
  ];

  for (const r of recipes) {
    const ingredientId = created[r.ingredientName];
    if (!ingredientId) { console.log(`Skipping - ingredient not found: ${r.ingredientName}`); continue; }
    await prisma.recipe.upsert({
      where: { id: `${r.menuItemName}-${r.ingredientName}` },
      update: { quantity: r.qty },
      create: {
        id: `${r.menuItemName}-${r.ingredientName}`.replace(/[^a-z0-9-]/gi,'_').toLowerCase(),
        menuItemName: r.menuItemName,
        ingredientId,
        quantity: r.qty,
      },
    });
  }

  console.log('Inventario seed completado!');
}

seedInventory()
  .catch(console.error)
  .finally(() => prisma.$disconnect());