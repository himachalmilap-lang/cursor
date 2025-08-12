import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type PaymentMethod = 'BANK' | 'CASH' | 'ONLINE';

export interface PaymentDocument extends Document {
  invoice: Types.ObjectId;
  amount: number;
  date: Date;
  method: PaymentMethod;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<PaymentDocument>(
  {
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: () => new Date() },
    method: { type: String, enum: ['BANK', 'CASH', 'ONLINE'], required: true },
    notes: String,
  },
  { timestamps: true }
);

export const Payment: Model<PaymentDocument> = mongoose.models.Payment || mongoose.model<PaymentDocument>('Payment', PaymentSchema);