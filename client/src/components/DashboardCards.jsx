import { ORDER_STATUSES } from "../constants/statuses";

function DashboardCards({ dashboard }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-xs text-slate-500">Total Orders</p><p className="text-xl font-semibold">{dashboard.totalOrders || 0}</p></div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="text-xs text-slate-500">Total Revenue</p><p className="text-xl font-semibold">Rs {dashboard.totalRevenue || 0}</p></div>
      {ORDER_STATUSES.map((status) => (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3" key={status}>
          <p className="text-xs text-slate-500">{status}</p>
          <p className="text-xl font-semibold">{dashboard.ordersPerStatus?.[status] || 0}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;