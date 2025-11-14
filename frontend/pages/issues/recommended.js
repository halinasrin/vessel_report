import { useState } from "react";
import axios from "../../lib/axios";

export default function Recommended() {
  const [q, setQ] = useState({ category: "", type: "" });
  const [resData, setResData] = useState(null);

  const search = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.category) params.append("category", q.category);
    if (q.type) params.append("type", q.type);
    const res = await axios.get(`/recommend?${params.toString()}`);
    setResData(res.data);
  };

  return (
    <div className="max-w-2xl bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-3">Recommended Past Issues</h2>
      <form onSubmit={search} className="space-y-3">
        <input placeholder="Category" value={q.category} onChange={e=>setQ({...q, category:e.target.value})} className="w-full p-2 border rounded" />
        <input placeholder="Vessel Type" value={q.type} onChange={e=>setQ({...q, type:e.target.value})} className="w-full p-2 border rounded" />
        <button className="bg-blue-600 text-white px-3 py-2 rounded">Search</button>
      </form>

      {resData && (
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">Cached: {String(resData.cached)}</div>
          {resData.data && resData.data.map((i) => (
            <div key={i.id} className="p-2 border rounded mb-2">
              <div className="font-semibold">{i.category} — {i.priority}</div>
              <div>{i.description}</div>
              <div className="text-sm text-gray-600">Vessel: {i.Vessel?.name || i.vesselId}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
