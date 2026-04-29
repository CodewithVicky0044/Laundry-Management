function OrderForm({ form, garments, onFormChange, onGarmentChange, onAddGarment, onRemoveGarment, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Customer Name" value={form.customerName} onChange={(e) => onFormChange("customerName", e.target.value)} required />
      <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Phone Number" value={form.phone} onChange={(e) => onFormChange("phone", e.target.value)} required />

      {garments.map((g, index) => (
        <div className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_auto]" key={index}>
          <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Garment" value={g.type} onChange={(e) => onGarmentChange(index, "type", e.target.value)} required />
          <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Quantity" type="number" min="1" value={g.quantity} onChange={(e) => onGarmentChange(index, "quantity", e.target.value)} required />
          <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Price" type="number" min="0" value={g.price} onChange={(e) => onGarmentChange(index, "price", e.target.value)} required />
          <button className="rounded-md bg-slate-700 px-3 py-2 text-white disabled:opacity-40" type="button" onClick={() => onRemoveGarment(index)} disabled={garments.length === 1}>X</button>
        </div>
      ))}

      <div className="flex gap-2 pt-1">
        <button className="rounded-md bg-teal-700 px-4 py-2 font-medium text-white" type="button" onClick={onAddGarment}>Add Garment</button>
        <button className="rounded-md bg-indigo-700 px-4 py-2 font-medium text-white" type="submit">Create Order</button>
      </div>
    </form>
  );
}

export default OrderForm;