import { Request, Response } from 'express';
import { Payment } from '../models/Payment';
import { Invoice } from '../models/Invoice';

export async function recordPayment(req: Request, res: Response) {
  const { invoiceId, amount, date, method, notes } = req.body as any;
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  const payment = await Payment.create({ invoice: invoice._id, amount, date, method, notes });
  const newAmountPaid = (invoice.amountPaid || 0) + amount;
  let status: any = invoice.status;
  if (newAmountPaid >= invoice.total) status = 'PAID';
  else if (newAmountPaid > 0) status = 'PARTIALLY_PAID';
  await Invoice.findByIdAndUpdate(invoice._id, { amountPaid: newAmountPaid, status });
  res.status(201).json({ payment });
}