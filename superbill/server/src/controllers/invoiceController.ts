import { Request, Response } from 'express';
import { Invoice } from '../models/Invoice';
import { generateInvoicePdf } from '../services/pdfService';
import { generateInvoiceXml } from '../services/xmlService';

function computeTotals(items: Array<{ quantity: number; unitPrice: number; taxRate?: number }>) {
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const taxTotal = items.reduce((sum, i) => sum + (i.taxRate || 0) / 100 * i.quantity * i.unitPrice, 0);
  const total = subtotal + taxTotal;
  return { subtotal, taxTotal, total };
}

export async function listInvoices(_req: Request, res: Response) {
  const invoices = await Invoice.find().populate('client').sort({ createdAt: -1 });
  res.json({ invoices });
}

export async function createInvoice(req: Request, res: Response) {
  const { number, client, issueDate, dueDate, currency, items } = req.body;
  const totals = computeTotals(items || []);
  const invoice = await Invoice.create({ number, client, issueDate, dueDate, currency, items, ...totals, amountPaid: 0, status: 'DRAFT' });
  res.status(201).json({ invoice });
}

export async function getInvoice(req: Request, res: Response) {
  const invoice = await Invoice.findById(req.params.id).populate('client');
  if (!invoice) return res.status(404).json({ message: 'Not found' });
  res.json({ invoice });
}

export async function updateInvoice(req: Request, res: Response) {
  const { items, ...rest } = req.body;
  let update: any = { ...rest };
  if (items) {
    const totals = computeTotals(items);
    update = { ...update, items, ...totals };
  }
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!invoice) return res.status(404).json({ message: 'Not found' });
  res.json({ invoice });
}

export async function deleteInvoice(req: Request, res: Response) {
  await Invoice.findByIdAndDelete(req.params.id);
  res.status(204).send();
}

export async function pdfInvoice(req: Request, res: Response) {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: 'Not found' });
  const pdf = generateInvoicePdf(invoice);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="invoice-${invoice.number}.pdf"`);
  res.send(pdf);
}

export async function xmlInvoice(req: Request, res: Response) {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: 'Not found' });
  const xml = generateInvoiceXml(invoice);
  res.setHeader('Content-Type', 'application/xml');
  res.send(xml);
}