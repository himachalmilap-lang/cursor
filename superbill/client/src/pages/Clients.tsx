import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export default function ClientsPage() {
  const { data } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => (await api.get('/clients')).data.clients as any[],
  });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Clients</h1>
      <ul className="mt-4 divide-y">
        {data?.map((c) => (
          <li key={c._id} className="py-2">
            <div className="font-medium">{c.name}</div>
            <div className="text-xs text-slate-500">{c.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}