import { create } from 'xmlbuilder2';
import { InvoiceDocument } from '../models/Invoice';

export function generateInvoiceXml(invoice: InvoiceDocument): string {
  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('Invoice')
    .ele('Number').txt(invoice.number).up()
    .ele('IssueDate').txt(invoice.issueDate.toISOString()).up()
    .ele('DueDate').txt(invoice.dueDate.toISOString()).up()
    .ele('Currency').txt(invoice.currency).up()
    .ele('Totals')
    .ele('Subtotal').txt(String(invoice.subtotal)).up()
    .ele('TaxTotal').txt(String(invoice.taxTotal)).up()
    .ele('Total').txt(String(invoice.total)).up()
    .up();
  return root.end({ prettyPrint: true });
}