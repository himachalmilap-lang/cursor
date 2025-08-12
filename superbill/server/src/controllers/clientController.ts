import { Request, Response } from 'express';
import { Client } from '../models/Client';

export async function listClients(_req: Request, res: Response) {
  const clients = await Client.find().sort({ createdAt: -1 });
  res.json({ clients });
}

export async function createClient(req: Request, res: Response) {
  const client = await Client.create(req.body);
  res.status(201).json({ client });
}

export async function getClient(req: Request, res: Response) {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: 'Not found' });
  res.json({ client });
}

export async function updateClient(req: Request, res: Response) {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!client) return res.status(404).json({ message: 'Not found' });
  res.json({ client });
}

export async function deleteClient(req: Request, res: Response) {
  await Client.findByIdAndDelete(req.params.id);
  res.status(204).send();
}