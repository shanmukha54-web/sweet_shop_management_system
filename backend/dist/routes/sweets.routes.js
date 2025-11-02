"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sweetsRouter = void 0;
const express_1 = require("express");
const sweets_controller_1 = require("../controllers/sweets.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
exports.sweetsRouter = (0, express_1.Router)();
exports.sweetsRouter.get('/', auth_middleware_1.authenticate, sweets_controller_1.listSweets);
exports.sweetsRouter.get('/search', auth_middleware_1.authenticate, sweets_controller_1.searchSweets);
exports.sweetsRouter.post('/', auth_middleware_1.authenticate, sweets_controller_1.createSweet); // admin check inside
exports.sweetsRouter.put('/:id', auth_middleware_1.authenticate, sweets_controller_1.updateSweet);
exports.sweetsRouter.delete('/:id', auth_middleware_1.authenticate, sweets_controller_1.deleteSweet);
exports.sweetsRouter.post('/:id/purchase', auth_middleware_1.authenticate, sweets_controller_1.purchaseSweet);
exports.sweetsRouter.post('/:id/restock', auth_middleware_1.authenticate, sweets_controller_1.restockSweet);
//# sourceMappingURL=sweets.routes.js.map