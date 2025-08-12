import PDFDocument from 'pdfkit';
import { InvoiceDocument } from '../models/Invoice';

export function generateInvoicePdf(invoice: InvoiceDocument): Buffer {
  const doc = new PDFDocument({ margin: 40 });
  const chunks: Buffer[] = [];
  doc.on('data', (chunk: Buffer) => chunks.push(chunk));

  doc.fontSize(20).text('Invoice', { align: 'right' });
  doc.moveDown();
  doc.fontSize(12).text(`Invoice #: ${invoice.number}`);
  doc.text(`Issue Date: ${invoice.issueDate.toDateString()}`);
  doc.text(`Due Date: ${invoice.dueDate.toDateString()}`);
  doc.moveDown();

  doc.fontSize(14).text('Items');
  doc.moveDown(0.5);
  invoice.items.forEach((item) => {
    doc.text(`${item.description} - ${item.quantity} x ${item.unitPrice.toFixed(2)}`);
  });

  doc.moveDown();
  doc.text(`Subtotal: ${invoice.subtotal.toFixed(2)}`);
  doc.text(`Tax: ${invoice.taxTotal.toFixed(2)}`);
  doc.text(`Total: ${invoice.total.toFixed(2)}`);

  doc.end();
  return Buffer.concat(chunks);
}