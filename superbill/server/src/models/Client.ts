import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ClientDocument extends Document {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  currency?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<ClientDocument>(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    address: String,
    notes: String,
    currency: { type: String, default: 'EUR' },
  },
  { timestamps: true }
);

export const Client: Model<ClientDocument> = mongoose.models.Client || mongoose.model<ClientDocument>('Client', ClientSchema);