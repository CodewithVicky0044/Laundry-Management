import { ORDER_STATUSES } from "../constants/statuses";

function OrdersList({ orders, onUpdateStatus }) {
  if (!orders.length) return <p className="text-sm text-slate-500">No orders found.</p>;

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <article className="rounded-lg border border-slate-200 bg-slate-50 p-3" key={order._id}>
          <p className="font-semibold">{order.customerName} <span className="font-normal">({order.phone})</span></p>
          <p className="text-xs text-slate-500">Order ID: {order.orderId || "-"} | DB: {order._id}</p>
          <p className="text-sm text-slate-600">{order.garments.map((g) => `${g.type} x${g.quantity} @ ${g.price}`).join(", ")}</p>
          <p className="mt-1 font-semibold">Total: Rs {order.totalAmount}</p>
          <p className="text-sm text-slate-500">Status: {order.status}</p>
          <select className="mt-2 rounded-md border border-slate-300 px-3 py-2" defaultValue={order.status} onChange={(e) => onUpdateStatus(order._id, e.target.value)}>
            {ORDER_STATUSES.map((status) => (<option key={status} value={status}>{status}</option>))}
          </select>
        </article>
      ))}
    </div>
  );
}

export default OrdersList;