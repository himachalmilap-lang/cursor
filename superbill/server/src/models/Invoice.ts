import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number; // percentage
}

export interface InvoiceDocument extends Document {
  number: string;
  client: Types.ObjectId;
  issueDate: Date;
  dueDate: Date;
  currency: string;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  amountPaid: number;
  status: InvoiceStatus;
  pdfUrl?: string;
  xmlUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema<InvoiceItem>(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    taxRate: { type: Number, default: 0 },
  },
  { _id: false }
);

const InvoiceSchema = new Schema<InvoiceDocument>(
  {
    number: { type: String, required: true, unique: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    currency: { type: String, default: 'EUR' },
    items: { type: [ItemSchema], default: [] },
    subtotal: { type: Number, required: true },
    taxTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    status: { type: String, enum: ['DRAFT', 'SENT', 'PARTIALLY_PAID', 'PAID', 'OVERDUE'], default: 'DRAFT' },
    pdfUrl: String,
    xmlUrl: String,
  },
  { timestamps: true }
);

export const Invoice: Model<InvoiceDocument> = mongoose.models.Invoice || mongoose.model<InvoiceDocument>('Invoice', InvoiceSchema);