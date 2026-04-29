import { ORDER_STATUSES } from "../constants/statuses";

function OrderFilters({ search, statusFilter, onSearchChange, onStatusChange, onApply }) {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Search by customer or phone" value={search} onChange={(e) => onSearchChange(e.target.value)} />
      <select className="rounded-md border border-slate-300 px-3 py-2" value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">All Status</option>
        {ORDER_STATUSES.map((status) => (<option key={status} value={status}>{status}</option>))}
      </select>
      <button className="rounded-md bg-teal-700 px-4 py-2 font-medium text-white" type="button" onClick={onApply}>Apply</button>
    </div>
  );
}

export default OrderFilters;