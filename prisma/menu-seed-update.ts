import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateMenu() {
  console.log('Actualizando menu de Ricardo\'s Pizza...');

  // Delete all existing menu items and recreate
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();

  const menu = [
    // ── PIZZAS CLASICAS - Pedazos (por pedazo) ──────────────────
    { name:'Pedazo Pepperoni',         price:50,  category:'Clasicas Pedazo',  station:'hot', size:'1 pedazo',   emoji:'&#127829;', popular:false, description:'Pedazo de pizza pepperoni' },
    { name:'Pedazo Jamon y Queso',     price:50,  category:'Clasicas Pedazo',  station:'hot', size:'1 pedazo',   emoji:'&#127829;', popular:false, description:'Pedazo de pizza jamon y queso' },
    { name:'Pedazo Queso y Maiz',      price:50,  category:'Clasicas Pedazo',  station:'hot', size:'1 pedazo',   emoji:'&#127829;', popular:false, description:'Pedazo de pizza queso y maiz' },

    // ── PIZZAS CLASICAS - Pizza Normal (10 pedazos) ─────────────
    { name:'Pizza Pepperoni',          price:400, category:'Clasicas 10pz',    station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:true,  description:'Pepperoni' },
    { name:'Pizza Jamon y Queso',      price:400, category:'Clasicas 10pz',    station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:false, description:'Jamon y queso' },
    { name:'Pizza Queso y Maiz',       price:400, category:'Clasicas 10pz',    station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:false, description:'Queso y maiz' },

    // ── PIZZAS CLASICAS - Personales (4 pedazos) ────────────────
    { name:'Personal Pepperoni',       price:150, category:'Clasicas Pers.',   station:'hot', size:'4 pedazos',  emoji:'&#127829;', popular:true,  description:'Pepperoni personal' },
    { name:'Personal Jamon y Queso',   price:150, category:'Clasicas Pers.',   station:'hot', size:'4 pedazos',  emoji:'&#127829;', popular:false, description:'Jamon y queso personal' },
    { name:'Personal Queso y Maiz',    price:150, category:'Clasicas Pers.',   station:'hot', size:'4 pedazos',  emoji:'&#127829;', popular:false, description:'Queso y maiz personal' },

    // ── PIZZAS ESPECIALES - Pedazos ──────────────────────────────
    { name:'Pedazo Tocineta y Queso',  price:60,  category:'Especiales Pedazo',station:'hot', size:'1 pedazo',   emoji:'&#127829;', popular:false, description:'Pedazo tocineta y queso' },
    { name:'Pedazo Salchicha Italiana',price:60,  category:'Especiales Pedazo',station:'hot', size:'1 pedazo',   emoji:'&#127829;', popular:false, description:'Pedazo salchicha italiana' },
    { name:'Pedazo Vegetales',         price:60,  category:'Especiales Pedazo',station:'hot', size:'1 pedazo',   emoji:'&#127822;', popular:false, description:'Pedazo vegetales' },

    // ── PIZZAS ESPECIALES - Pizza Normal (10 pedazos) ───────────
    { name:'Pizza Tocineta y Queso',   price:450, category:'Especiales 10pz',  station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:false, description:'Tocineta y queso' },
    { name:'Pizza Salchicha Italiana', price:450, category:'Especiales 10pz',  station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:true,  description:'Salchicha italiana' },
    { name:'Pizza Vegetales',          price:450, category:'Especiales 10pz',  station:'hot', size:'10 pedazos', emoji:'&#127822;', popular:false, description:'Vegetales frescos' },

    // ── PIZZAS ESPECIALES - Personales ──────────────────────────
    { name:'Personal Tocineta y Queso',price:200, category:'Especiales Pers.', station:'hot', size:'4 pedazos',  emoji:'&#127829;', popular:false, description:'Tocineta y queso personal' },
    { name:'Personal Salchicha It.',   price:200, category:'Especiales Pers.', station:'hot', size:'4 pedazos',  emoji:'&#127829;', popular:false, description:'Salchicha italiana personal' },
    { name:'Personal Vegetales',       price:200, category:'Especiales Pers.', station:'hot', size:'4 pedazos',  emoji:'&#127822;', popular:false, description:'Vegetales personal' },

    // ── PIZZAS PREMIUM (10 pedazos) ─────────────────────────────
    { name:'La Doble',                 price:500, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:true,  description:'Doble queso y doble pepperoni' },
    { name:'La Contagiosa',            price:500, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:false, description:'Jamon, queso, pepperoni y maiz' },
    { name:'Especial de Carne',        price:650, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:true,  description:'Jamon, queso, pepperoni, tocineta y salchicha italiana' },
    { name:'La Irresistible',          price:500, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:false, description:'Pepperoni y salchicha italiana' },
    { name:'La Triple',                price:600, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:false, description:'Triple queso y pepperoni' },
    { name:'La Suprema',               price:700, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:true,  description:'Salchicha italiana, maiz, pepperoni, jamon, tocineta y queso' },
    { name:'4 Quesos',                 price:500, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:false, description:'Queso Gouda, Parmesano, Cheddar y Mozzarella' },
    { name:'La Supersuprema',          price:750, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:true,  description:'Salchicha italiana, tocineta, jamon, pepperoni, maiz, vegetales y queso' },
    { name:'La Consentida',            price:700, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:false, description:'Pollo, vegetales, tocino y queso' },
    { name:'Especial de Ricardos',     price:850, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:true,  description:'Pollo, salchicha italiana, tocineta, jamon, pepperoni, maiz, vegetales y queso' },
    { name:'Pizza de Pollo',           price:500, category:'Premium',          station:'hot', size:'10 pedazos', emoji:'&#127829;', popular:false, description:'Pollo' },

    // ── BEBIDAS ──────────────────────────────────────────────────
    { name:'Agua (botella)',           price:25,  category:'Bebidas',          station:'cold',size:'500ml',       emoji:'&#128167;', popular:false, description:'Agua mineral' },
    { name:'Refresco 16oz',            price:50,  category:'Bebidas',          station:'cold',size:'16oz',        emoji:'&#127864;', popular:false, description:'Refresco frio' },
    { name:'Refresco 1 litro',         price:100, category:'Bebidas',          station:'cold',size:'1 litro',     emoji:'&#127864;', popular:true,  description:'Refresco familiar' },
    { name:'Refresco 2 litros',        price:150, category:'Bebidas',          station:'cold',size:'2 litros',    emoji:'&#127864;', popular:false, description:'Refresco grande' },
    { name:'Jugo Natural',             price:50,  category:'Bebidas',          station:'cold',size:'16oz',        emoji:'&#129389;', popular:false, description:'Jugo natural fresco' },

    // ── INGREDIENTES EXTRAS ──────────────────────────────────────
    { name:'Extra Maiz',               price:50,  category:'Extras',           station:'hot', size:'porcion',    emoji:'&#127807;', popular:false, description:'RD$ 50' },
    { name:'Extra Jamon',              price:50,  category:'Extras',           station:'hot', size:'porcion',    emoji:'&#129363;', popular:false, description:'RD$ 50' },
    { name:'Extra Pepperoni',          price:50,  category:'Extras',           station:'hot', size:'porcion',    emoji:'&#129363;', popular:false, description:'RD$ 50' },
    { name:'Extra Queso',              price:50,  category:'Extras',           station:'hot', size:'porcion',    emoji:'&#129472;', popular:false, description:'RD$ 50' },
    { name:'Extra Parmesano',          price:50,  category:'Extras',           station:'hot', size:'porcion',    emoji:'&#129472;', popular:false, description:'RD$ 50' },
    { name:'Extra Salchicha It.',      price:100, category:'Extras',           station:'hot', size:'porcion',    emoji:'&#129363;', popular:false, description:'RD$ 100' },
    { name:'Extra Tocineta',           price:100, category:'Extras',           station:'hot', size:'porcion',    emoji:'&#129363;', popular:false, description:'RD$ 100' },
    { name:'Extra Vegetales',          price:100, category:'Extras',           station:'hot', size:'porcion',    emoji:'&#127822;', popular:false, description:'RD$ 100' },
    { name:'Extra Queso Gouda',        price:100, category:'Extras',           station:'hot', size:'porcion',    emoji:'&#129472;', popular:false, description:'RD$ 100' },
    { name:'Extra Pollo',              price:100, category:'Extras',           station:'hot', size:'porcion',    emoji:'&#129363;', popular:false, description:'RD$ 100' },
  ];

  let count = 0;
  for (const item of menu) {
    await prisma.menuItem.create({ data: item });
    count++;
    console.log(`Creado: ${item.name} - RD$ ${item.price}`);
  }

  console.log(`\nMenu actualizado: ${count} productos creados!`);
}

updateMenu()
  .catch(console.error)
  .finally(() => prisma.$disconnect());