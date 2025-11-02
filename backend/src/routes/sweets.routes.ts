import { Router } from 'express';
import {
  createSweet,
  listSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from '../controllers/sweets.controller';
import { authenticate } from '../middleware/auth.middleware';

export const sweetsRouter = Router();

sweetsRouter.get('/', authenticate, listSweets);
sweetsRouter.get('/search', authenticate, searchSweets);

sweetsRouter.post('/', authenticate, createSweet); // admin check inside
sweetsRouter.put('/:id', authenticate, updateSweet);
sweetsRouter.delete('/:id', authenticate, deleteSweet);

sweetsRouter.post('/:id/purchase', authenticate, purchaseSweet);
sweetsRouter.post('/:id/restock', authenticate, restockSweet);

