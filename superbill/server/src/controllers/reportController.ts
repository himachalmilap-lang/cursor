import { Request, Response } from 'express';
import { Invoice } from '../models/Invoice';

export async function salesByMonth(req: Request, res: Response) {
  const year = Number(req.query.year) || new Date().getFullYear();
  const data = await Invoice.aggregate([
    { $match: { issueDate: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) } } },
    {
      $group: {
        _id: { month: { $month: '$issueDate' } },
        total: { $sum: '$total' },
        subtotal: { $sum: '$subtotal' },
        taxTotal: { $sum: '$taxTotal' },
      },
    },
    { $sort: { '_id.month': 1 } },
  ]);
  res.json({ year, data });
}

export async function taxSummary(req: Request, res: Response) {
  const year = Number(req.query.year) || new Date().getFullYear();
  const data = await Invoice.aggregate([
    { $match: { issueDate: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) } } },
    { $group: { _id: null, taxTotal: { $sum: '$taxTotal' }, total: { $sum: '$total' } } },
  ]);
  res.json({ year, summary: data[0] || { taxTotal: 0, total: 0 } });
}