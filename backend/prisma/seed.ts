import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.sweet.count();
  if (count === 0) {
    await prisma.sweet.createMany({
      data: [
        { name: 'Gulab Jamun', category: 'Indian', price: 25, quantity: 50 },
        { name: 'Rasgulla', category: 'Bengali', price: 30, quantity: 80 },
        { name: 'Laddu', category: 'South Indian', price: 20, quantity: 100 },
        { name: 'Kaju Katli', category: 'North Indian', price: 40, quantity: 60 },
        { name: 'Mysore Pak', category: 'South Indian', price: 35, quantity: 70 }
      ],
    });
    console.log('✅ Seed data inserted successfully');
  } else {
    console.log('🌸 Seed skipped — sweets already exist');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());