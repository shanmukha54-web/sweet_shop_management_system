"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSweet = createSweet;
exports.listSweets = listSweets;
exports.searchSweets = searchSweets;
exports.updateSweet = updateSweet;
exports.deleteSweet = deleteSweet;
exports.purchaseSweet = purchaseSweet;
exports.restockSweet = restockSweet;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createSweet(data, user) {
    if (!user || user.role !== 'ADMIN')
        throw { statusCode: 403, message: 'Admin only' };
    const { name, category, price, quantity } = data;
    if (!name || !category || price == null || quantity == null)
        throw { statusCode: 400, message: 'Missing fields' };
    const sweet = await prisma.sweet.create({ data: { name, category, price: Number(price), quantity: Number(quantity) } });
    return sweet;
}
async function listSweets() {
    return prisma.sweet.findMany({ orderBy: { id: 'asc' } });
}
async function searchSweets(params) {
    const where = {};
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
        if (params.minPrice != null)
            where.price.gte = params.minPrice;
        if (params.maxPrice != null)
            where.price.lte = params.maxPrice;
    }
    return prisma.sweet.findMany({ where });
}
async function updateSweet(id, payload, user) {
    if (!user || user.role !== 'ADMIN')
        throw { statusCode: 403, message: 'Admin only' };
    const existing = await prisma.sweet.findUnique({ where: { id } });
    if (!existing)
        throw { statusCode: 404, message: 'Sweet not found' };
    const updated = await prisma.sweet.update({ where: { id }, data: payload });
    return updated;
}
async function deleteSweet(id, user) {
    if (!user || user.role !== 'ADMIN')
        throw { statusCode: 403, message: 'Admin only' };
    await prisma.sweet.delete({ where: { id } });
    return true;
}
async function purchaseSweet(id, quantity, user) {
    const sweet = await prisma.sweet.findUnique({ where: { id } });
    if (!sweet)
        throw { statusCode: 404, message: 'Sweet not found' };
    if (sweet.quantity < quantity)
        throw { statusCode: 400, message: 'Insufficient stock' };
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
async function restockSweet(id, quantity, user) {
    if (!user || user.role !== 'ADMIN')
        throw { statusCode: 403, message: 'Admin only' };
    const sweet = await prisma.sweet.findUnique({ where: { id } });
    if (!sweet)
        throw { statusCode: 404, message: 'Sweet not found' };
    const updated = await prisma.sweet.update({ where: { id }, data: { quantity: sweet.quantity + quantity } });
    return updated;
}
//# sourceMappingURL=sweets.services.js.map