import nodemailer from 'nodemailer';
import { env } from '../config/env';

export async function sendEmail(options: { to: string; subject: string; text?: string; html?: string }) {
  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: env.smtp.user && env.smtp.pass ? { user: env.smtp.user, pass: env.smtp.pass } : undefined,
  });

  return transporter.sendMail({ from: env.smtp.user || 'no-reply@superbill.local', ...options });
}