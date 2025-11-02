"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let adminToken;
let userToken;
beforeAll(async () => {
    // clear db
    await prisma.purchase.deleteMany();
    await prisma.sweet.deleteMany();
    await prisma.user.deleteMany();
    // create admin and user via direct prisma with hashed password
    const bcrypt = require('bcryptjs');
    const admin = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password: await bcrypt.hash('adminpass', 10),
            role: 'ADMIN'
        }
    });
    const user = await prisma.user.create({
        data: {
            email: 'buyer@example.com',
            password: await bcrypt.hash('buyerpass', 10),
            role: 'USER'
        }
    });
    const resAdmin = await (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({ email: 'admin@example.com', password: 'adminpass' });
    adminToken = resAdmin.body.token;
    const resUser = await (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({ email: 'buyer@example.com', password: 'buyerpass' });
    userToken = resUser.body.token;
});
afterAll(async () => {
    await prisma.$disconnect();
});
describe('Sweets API', () => {
    it('admin can create a sweet', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/sweets')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'Ladoo', category: 'Traditional', price: 10.5, quantity: 50 });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Ladoo');
    });
    it('user can list sweets', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/sweets').set('Authorization', `Bearer ${userToken}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it('user can purchase a sweet', async () => {
        // get sweet id
        const list = await (0, supertest_1.default)(app_1.default).get('/api/sweets').set('Authorization', `Bearer ${userToken}`);
        const sweetId = list.body[0].id;
        const res = await (0, supertest_1.default)(app_1.default)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ quantity: 2 });
        expect(res.status).toBe(200);
        expect(res.body.purchased).toBeDefined();
    });
    it('admin can restock', async () => {
        const list = await (0, supertest_1.default)(app_1.default).get('/api/sweets').set('Authorization', `Bearer ${adminToken}`);
        const sweetId = list.body[0].id;
        const res = await (0, supertest_1.default)(app_1.default)
            .post(`/api/sweets/${sweetId}/restock`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ quantity: 10 });
        expect(res.status).toBe(200);
        expect(res.body.quantity).toBeDefined();
    });
});
//# sourceMappingURL=sweets.test.js.map