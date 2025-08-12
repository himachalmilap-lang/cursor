import mongoose from 'mongoose';

export async function connectToDatabase(mongoUri?: string): Promise<typeof mongoose> {
  const uri = mongoUri || process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI not set');
  }
  mongoose.connection.on('connected', () => console.log('MongoDB connected'));
  mongoose.connection.on('error', (err) => console.error('MongoDB error', err));
  return mongoose.connect(uri);
}