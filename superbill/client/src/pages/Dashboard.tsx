export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">Invoices</div>
        <div className="rounded-lg border p-4">Payments</div>
        <div className="rounded-lg border p-4">Expenses</div>
        <div className="rounded-lg border p-4">Deadlines</div>
      </div>
    </div>
  );
}