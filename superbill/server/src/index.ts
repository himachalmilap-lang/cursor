import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db';
import { startReminders } from './jobs/reminders';

dotenv.config();

async function bootstrap() {
  await connectToDatabase();
  startReminders();

  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(compression());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Routes
  app.use('/auth', (await import('./routes/auth')).default);
  app.use('/clients', (await import('./routes/clients')).default);
  app.use('/invoices', (await import('./routes/invoices')).default);
  app.use('/payments', (await import('./routes/payments')).default);
  app.use('/reports', (await import('./routes/reports')).default);

  // Error handler
  app.use((await import('./middleware/errorHandler')).errorHandler);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Fatal startup error', err);
  process.exit(1);
});