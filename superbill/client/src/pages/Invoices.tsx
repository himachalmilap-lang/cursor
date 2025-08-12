import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export default function InvoicesPage() {
  const { data } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => (await api.get('/invoices')).data.invoices as any[],
  });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Invoices</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="px-2 py-1">Number</th>
              <th className="px-2 py-1">Issue</th>
              <th className="px-2 py-1">Due</th>
              <th className="px-2 py-1">Total</th>
              <th className="px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((inv) => (
              <tr key={inv._id} className="border-t">
                <td className="px-2 py-1">{inv.number}</td>
                <td className="px-2 py-1">{new Date(inv.issueDate).toLocaleDateString()}</td>
                <td className="px-2 py-1">{new Date(inv.dueDate).toLocaleDateString()}</td>
                <td className="px-2 py-1">{inv.total}</td>
                <td className="px-2 py-1">{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}