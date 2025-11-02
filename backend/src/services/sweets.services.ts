import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type SearchParams = { q?: string; category?: string; minPrice?: number; maxPrice?: number };

export async function createSweet(data: any, user: any) {
  if (!user || user.role !== 'ADMIN') throw { statusCode: 403, message: 'Admin only' };
  const { name, category, price, quantity } = data;
  if (!name || !category || price == null || quantity == null) throw { statusCode: 400, message: 'Missing fields' };
  const sweet = await prisma.sweet.create({ data: { name, category, price: Number(price), quantity: Number(quantity) } });
  return sweet;
}

export async function listSweets() {
  return prisma.sweet.findMany({ orderBy: { id: 'asc' } });
}

export async function searchSweets(params: SearchParams) {
  const where: any = {};
  if (params.q) {
    where.OR = [
      { name: { contains: params.q, mode: 'insensitive' } },
      { category: { contains: params.q, mode: 'insensitive' } },
    ];
  }
  if (params.category) {
    where.category = { equals: params.category, mode: 'insensitive' };
  }
  if (params.minPrice != null || params.maxPrice != null) {
    where.price = {};
    if (params.minPrice != null) where.price.gte = params.minPrice;
    if (params.maxPrice != null) where.price.lte = params.maxPrice;
  }
  return prisma.sweet.findMany({ where });
}

export async function updateSweet(id: number, payload: any, user: any) {
  if (!user || user.role !== 'ADMIN') throw { statusCode: 403, message: 'Admin only' };
  const existing = await prisma.sweet.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: 'Sweet not found' };

  const updated = await prisma.sweet.update({ where: { id }, data: payload });
  return updated;
}

export async function deleteSweet(id: number, user: any) {
  if (!user || user.role !== 'ADMIN') throw { statusCode: 403, message: 'Admin only' };
  await prisma.sweet.delete({ where: { id } });
  return true;
}

export async function purchaseSweet(id: number, quantity: number, user: any) {
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) throw { statusCode: 404, message: 'Sweet not found' };
  if (sweet.quantity < quantity) throw { statusCode: 400, message: 'Insufficient stock' };

  const total = quantity * sweet.price;
  const updated = await prisma.sweet.update({ where: { id }, data: { quantity: sweet.quantity - quantity } });
  // record purchase
  await prisma.purchase.create({
    data: {
      userId: user.id,
      sweetId: id,
      quantity,
      total,
    },
  });
  return { success: true, sweet: updated, purchased: { quantity, total } };
}

export async function restockSweet(id: number, quantity: number, user: any) {
  if (!user || user.role !== 'ADMIN') throw { statusCode: 403, message: 'Admin only' };
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) throw { statusCode: 404, message: 'Sweet not found' };
  const updated = await prisma.sweet.update({ where: { id }, data: { quantity: sweet.quantity + quantity } });
  return updated;
}
