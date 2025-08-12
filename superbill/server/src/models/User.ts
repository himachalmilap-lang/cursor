import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'ADMIN' | 'ACCOUNTANT' | 'OWNER' | 'STAFF';

export interface UserDocument extends Document {
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'ACCOUNTANT', 'OWNER', 'STAFF'], default: 'OWNER' },
  },
  { timestamps: true }
);

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);