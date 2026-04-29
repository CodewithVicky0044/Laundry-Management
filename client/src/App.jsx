import { useEffect, useState } from "react";
import { createOrder, getDashboard, getOrders, updateOrderStatus } from "./api/ordersApi";
import DashboardCards from "./components/DashboardCards";
import OrderFilters from "./components/OrderFilters";
import OrderForm from "./components/OrderForm";
import OrdersList from "./components/OrdersList";

const initialDashboard = {
  totalOrders: 0,
  totalRevenue: 0,
  ordersPerStatus: { RECEIVED: 0, PROCESSING: 0, READY: 0, DELIVERED: 0 }
};

function App() {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ customerName: "", phone: "" });
  const [garments, setGarments] = useState([{ type: "", quantity: 1, price: 0 }]);

  const loadDashboard = async () => setDashboard(await getDashboard());
  const loadOrders = async () => setOrders((await getOrders({ status: statusFilter, search })).orders || []);

  const refreshAll = async () => {
    setLoading(true);
    try {
      await Promise.all([loadDashboard(), loadOrders()]);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshAll(); }, []);

  const handleCreateOrder = async (event) => {
    event.preventDefault();
    try {
      await createOrder({
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        garments: garments.map((g) => ({ type: g.type.trim(), quantity: Number(g.quantity), price: Number(g.price) }))
      });
      setForm({ customerName: "", phone: "" });
      setGarments([{ type: "", quantity: 1, price: 0 }]);
      await refreshAll();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      await refreshAll();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-emerald-50 to-sky-100 px-4 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-4">
        <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-3xl font-bold">Laundry Order Management</h1>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Dashboard</h2>
          <DashboardCards dashboard={dashboard} />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Create Order</h2>
          <OrderForm
            form={form}
            garments={garments}
            onFormChange={(k, v) => setForm((prev) => ({ ...prev, [k]: v }))}
            onGarmentChange={(index, key, value) => setGarments((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)))}
            onAddGarment={() => setGarments((prev) => [...prev, { type: "", quantity: 1, price: 0 }])}
            onRemoveGarment={(index) => setGarments((prev) => prev.filter((_, i) => i !== index))}
            onSubmit={handleCreateOrder}
          />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Orders</h2>
          <OrderFilters
            search={search}
            statusFilter={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
            onApply={loadOrders}
          />
          {loading ? <p className="text-sm text-slate-500">Loading...</p> : <OrdersList orders={orders} onUpdateStatus={handleStatusUpdate} />}
        </section>
      </div>
    </main>
  );
}

export default App;
