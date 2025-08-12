import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/Dashboard';
import InvoicesPage from './pages/Invoices';
import ClientsPage from './pages/Clients';
import ReportsPage from './pages/Reports';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 w-60 border-r bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex items-center justify-between p-4 text-xl font-bold text-primary">
          <span>SuperBill</span>
          <ThemeToggle />
        </div>
        <nav className="px-2 space-y-1">
          <Link className="block rounded px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/dashboard">Dashboard</Link>
          <Link className="block rounded px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/invoices">Invoices</Link>
          <Link className="block rounded px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/clients">Clients</Link>
          <Link className="block rounded px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/reports">Reports</Link>
          <Link className="block rounded px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" to="/settings">Settings</Link>
        </nav>
      </aside>
      <main className="pl-60">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/invoices" element={<InvoicesPage />} />
                  <Route path="/clients" element={<ClientsPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="*" element={<div className="p-6">Not Found</div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
