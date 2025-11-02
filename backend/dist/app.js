"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = require("./routes/auth.routes");
const sweets_routes_1 = require("./routes/sweets.routes");
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.authRouter);
app.use('/api/sweets', sweets_routes_1.sweetsRouter);
app.get('/', (req, res) => res.json({ ok: true, message: 'Sweet Shop API' }));
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map