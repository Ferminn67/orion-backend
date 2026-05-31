import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Creando usuarios demo...');

  const users = [
    { name:'Carlos Admin',   email:'carlos@ricardos.com',  password:'admin123',    role:'admin'    },
    { name:'Maria Lopez',    email:'maria@ricardos.com',   password:'cashier123',  role:'cashier'  },
    { name:'Juan Perez',     email:'juan@ricardos.com',    password:'waiter123',   role:'waiter'   },
    { name:'Roberto Cocina', email:'roberto@ricardos.com', password:'kitchen123',  role:'kitchen'  },
    { name:'Alex Delivery',  email:'alex@ricardos.com',    password:'delivery123', role:'delivery' },
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: hashed },
    });
    console.log(`Usuario creado: ${u.name} (${u.role})`);
  }

  console.log('Creando mesas...');
  const tables = [
    { number:1,  capacity:2, shape:'square' },
    { number:2,  capacity:2, shape:'square' },
    { number:3,  capacity:4, shape:'square' },
    { number:4,  capacity:4, shape:'square' },
    { number:5,  capacity:6, shape:'rect'   },
    { number:6,  capacity:4, shape:'square' },
    { number:7,  capacity:2, shape:'round'  },
    { number:8,  capacity:4, shape:'round'  },
    { number:9,  capacity:6, shape:'rect'   },
    { number:10, capacity:2, shape:'square' },
    { number:11, capacity:4, shape:'square' },
    { number:12, capacity:8, shape:'rect'   },
  ];

  for (const t of tables) {
    await prisma.table.upsert({
      where: { number: t.number },
      update: {},
      create: t,
    });
  }

  console.log('Creando menu...');
  const menu = [
    { name:'Pizza Pepperoni',        price:400, category:'Clasicas 10pz',   station:'hot',  size:'10 pedazos', popular:true  },
    { name:'Pizza Jamon y Queso',     price:400, category:'Clasicas 10pz',   station:'hot',  size:'10 pedazos'               },
    { name:'Pizza Queso y Maiz',      price:400, category:'Clasicas 10pz',   station:'hot',  size:'10 pedazos'               },
    { name:'Personal Pepperoni',      price:150, category:'Clasicas Pers.',  station:'hot',  size:'4 pedazos',  popular:true  },
    { name:'Personal Jamon y Queso',  price:150, category:'Clasicas Pers.',  station:'hot',  size:'4 pedazos'                },
    { name:'Personal Queso y Maiz',   price:150, category:'Clasicas Pers.',  station:'hot',  size:'4 pedazos'                },
    { name:'Pizza Tocineta y Queso',  price:450, category:'Especiales 10pz', station:'hot',  size:'10 pedazos'               },
    { name:'Pizza Salchicha Italiana',price:450, category:'Especiales 10pz', station:'hot',  size:'10 pedazos', popular:true  },
    { name:'Pizza 4 Quesos',          price:500, category:'Especiales 10pz', station:'hot',  size:'10 pedazos'               },
    { name:'Pizza Vegetales',         price:450, category:'Especiales 10pz', station:'hot',  size:'10 pedazos'               },
    { name:'Personal Tocineta',       price:200, category:'Especiales Pers.',station:'hot',  size:'4 pedazos'                },
    { name:'Personal Salchicha It.',  price:200, category:'Especiales Pers.',station:'hot',  size:'4 pedazos'                },
    { name:'Personal 4 Quesos',       price:200, category:'Especiales Pers.',station:'hot',  size:'4 pedazos'                },
    { name:'Personal Vegetales',      price:200, category:'Especiales Pers.',station:'hot',  size:'4 pedazos'                },
    { name:'La Doble',                price:500, category:'Premium',         station:'hot',  size:'10 pedazos', popular:true, description:'Doble queso y doble pepperoni'  },
    { name:'La Contagiosa',           price:500, category:'Premium',         station:'hot',  size:'10 pedazos',              description:'Jamon, queso, pepperoni y maiz' },
    { name:'Especial de Carne',       price:650, category:'Premium',         station:'hot',  size:'10 pedazos', popular:true, description:'Jamon, queso, pepperoni, tocineta y salchicha' },
    { name:'La Irresistible',         price:500, category:'Premium',         station:'hot',  size:'10 pedazos',              description:'Pepperoni y salchicha italiana' },
    { name:'La Triple',               price:600, category:'Premium',         station:'hot',  size:'10 pedazos',              description:'Triple queso y pepperoni'       },
    { name:'La Suprema',              price:700, category:'Premium',         station:'hot',  size:'10 pedazos', popular:true, description:'Salchicha, maiz, pepperoni, jamon, tocineta y queso' },
    { name:'4 Quesos Premium',        price:500, category:'Premium',         station:'hot',  size:'10 pedazos',              description:'Gouda, Parmesano, Cheddar y Mozzarella' },
    { name:'La Supersuprema',         price:750, category:'Premium',         station:'hot',  size:'10 pedazos', popular:true, description:'Todo: salchicha, tocineta, jamon, pepperoni, maiz, vegetales' },
    { name:'La Consentida',           price:700, category:'Premium',         station:'hot',  size:'10 pedazos',              description:'Pollo, vegetales, tocino y queso' },
    { name:"Especial de Ricardo's",   price:850, category:'Premium',         station:'hot',  size:'10 pedazos', popular:true, description:'Pollo, salchicha, tocineta, jamon, pepperoni, maiz, vegetales' },
    { name:'Pizza de Pollo',          price:500, category:'Premium',         station:'hot',  size:'10 pedazos',              description:'Pollo'                          },
    { name:'Agua (botella)',           price:25,  category:'Bebidas',         station:'cold'                                                                              },
    { name:'Refresco 16oz',           price:50,  category:'Bebidas',         station:'cold'                                                                              },
    { name:'Refresco 1 litro',        price:100, category:'Bebidas',         station:'cold', popular:true                                                                },
    { name:'Refresco 2 litros',       price:150, category:'Bebidas',         station:'cold'                                                                              },
    { name:'Jugo Natural',            price:50,  category:'Bebidas',         station:'cold'                                                                              },
    { name:'Extra Maiz',              price:50,  category:'Extras',          station:'hot'                                                                               },
    { name:'Extra Jamon',             price:50,  category:'Extras',          station:'hot'                                                                               },
    { name:'Extra Pepperoni',         price:50,  category:'Extras',          station:'hot'                                                                               },
    { name:'Extra Queso',             price:50,  category:'Extras',          station:'hot'                                                                               },
    { name:'Extra Salchicha It.',     price:100, category:'Extras',          station:'hot'                                                                               },
    { name:'Extra Tocineta',          price:100, category:'Extras',          station:'hot'                                                                               },
    { name:'Extra Vegetales',         price:100, category:'Extras',          station:'hot'                                                                               },
    { name:'Extra Pollo',             price:100, category:'Extras',          station:'hot'                                                                               },
  ];

  for (const item of menu) {
    await prisma.menuItem.upsert({
      where: { id: item.name },
      update: { price: item.price },
      create: { ...item, emoji: '&#127829;' },
    });
  }

  console.log('Seed completado!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());