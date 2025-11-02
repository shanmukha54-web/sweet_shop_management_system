"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
beforeAll(async () => {
    // reset DB
    await prisma.purchase.deleteMany();
    await prisma.sweet.deleteMany();
    await prisma.user.deleteMany();
});
afterAll(async () => {
    await prisma.$disconnect();
});
describe('Auth', () => {
    it('registers a user', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email: 'user@example.com',
            password: 'password123',
            name: 'Test User'
        });
        expect(res.status).toBe(201);
        expect(res.body.user.email).toBe('user@example.com');
    });
    it('logs in the user', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email: 'user@example.com',
            password: 'password123',
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
//# sourceMappingURL=auth.test.js.map