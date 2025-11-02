"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSweet = createSweet;
exports.listSweets = listSweets;
exports.searchSweets = searchSweets;
exports.updateSweet = updateSweet;
exports.deleteSweet = deleteSweet;
exports.purchaseSweet = purchaseSweet;
exports.restockSweet = restockSweet;
const sweetsService = __importStar(require("../services/sweets.services"));
async function createSweet(req, res) {
    // admin check inside service
    const data = req.body;
    const sweet = await sweetsService.createSweet(data, req.user);
    res.status(201).json(sweet);
}
async function listSweets(req, res) {
    const sweets = await sweetsService.listSweets();
    res.json(sweets);
}
async function searchSweets(req, res) {
    const { q, category, minPrice, maxPrice } = req.query;
    const results = await sweetsService.searchSweets({
        q: q,
        category: category,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    res.json(results);
}
async function updateSweet(req, res) {
    const id = Number(req.params.id);
    const payload = req.body;
    const sweet = await sweetsService.updateSweet(id, payload, req.user);
    res.json(sweet);
}
async function deleteSweet(req, res) {
    const id = Number(req.params.id);
    await sweetsService.deleteSweet(id, req.user);
    res.status(204).send();
}
async function purchaseSweet(req, res) {
    const id = Number(req.params.id);
    const { quantity } = req.body;
    const result = await sweetsService.purchaseSweet(id, Number(quantity || 1), req.user);
    res.json(result);
}
async function restockSweet(req, res) {
    const id = Number(req.params.id);
    const { quantity } = req.body;
    const result = await sweetsService.restockSweet(id, Number(quantity || 0), req.user);
    res.json(result);
}
//# sourceMappingURL=sweets.controller.js.map