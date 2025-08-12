import cron from 'node-cron';
import dayjs from 'dayjs';
import { Invoice } from '../models/Invoice';
import { sendEmail } from '../services/emailService';

export function startReminders() {
  // Run every day at 09:00
  cron.schedule('0 9 * * *', async () => {
    const today = dayjs().startOf('day').toDate();
    const overdue = await Invoice.find({ dueDate: { $lt: today }, status: { $ne: 'PAID' } }).populate('client');
    for (const inv of overdue) {
      try {
        await Invoice.findByIdAndUpdate(inv._id, { status: 'OVERDUE' });
        const to = (inv as any).client?.email;
        if (to) {
          await sendEmail({
            to,
            subject: `Invoice ${inv.number} is overdue`,
            text: `Dear client, invoice ${inv.number} was due on ${dayjs(inv.dueDate).format('YYYY-MM-DD')}. Please make the payment of ${inv.total - (inv.amountPaid || 0)}.`,
          });
        }
      } catch (e) {
        console.error('Reminder error', e);
      }
    }
  });
}