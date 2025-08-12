import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReportsPage() {
  const year = new Date().getFullYear();
  const { data } = useQuery({
    queryKey: ['sales-by-month', year],
    queryFn: async () => (await api.get('/reports/sales-by-month', { params: { year } })).data.data as any[],
  });
  const chartData = (data || []).map((d: any) => ({ month: d._id.month, total: d.total }));
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Sales {year}</h1>
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#1E88E5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}