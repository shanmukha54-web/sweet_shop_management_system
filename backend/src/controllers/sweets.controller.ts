import { Request, Response } from 'express';
import * as sweetsService from '../services/sweets.services';

export async function createSweet(req: Request, res: Response) {
  // admin check inside service
  const data = req.body;
  const sweet = await sweetsService.createSweet(data, req.user);
  res.status(201).json(sweet);
}

export async function listSweets(req: Request, res: Response) {
  const sweets = await sweetsService.listSweets();
  res.json(sweets);
}

export async function searchSweets(req: Request, res: Response) {
  const { q, category, minPrice, maxPrice } = req.query;
  const results = await sweetsService.searchSweets({
    q: q as string | undefined,
    category: category as string | undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });
  res.json(results);
}

export async function updateSweet(req: Request, res: Response) {
  const id = Number(req.params.id);
  const payload = req.body;
  const sweet = await sweetsService.updateSweet(id, payload, req.user);
  res.json(sweet);
}

export async function deleteSweet(req: Request, res: Response) {
  const id = Number(req.params.id);
  await sweetsService.deleteSweet(id, req.user);
  res.status(204).send();
}

export async function purchaseSweet(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { quantity } = req.body;
  const result = await sweetsService.purchaseSweet(id, Number(quantity || 1), req.user);
  res.json(result);
}

export async function restockSweet(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { quantity } = req.body;
  const result = await sweetsService.restockSweet(id, Number(quantity || 0), req.user);
  res.json(result);
}
