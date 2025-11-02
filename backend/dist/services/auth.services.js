"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
async function register({ email, password, name, role }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
        throw { statusCode: 400, message: 'Email already registered' };
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            name,
            role: role === 'ADMIN' ? 'ADMIN' : 'USER',
        },
    });
    return user;
}
async function login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw { statusCode: 401, message: 'Invalid credentials' };
    const ok = await bcryptjs_1.default.compare(password, user.password);
    if (!ok)
        throw { statusCode: 401, message: 'Invalid credentials' };
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    return token;
}
//# sourceMappingURL=auth.services.js.map