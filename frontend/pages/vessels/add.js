import { useState } from "react";
import axios from "../../lib/axios";

export default function AddVessel() {
  const [form, setForm] = useState({
    name: "",
    imoNumber: "",
    flag: "",
    type: "",
    lastInspection: "",
  });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/vessels", form);
      setMsg("✅ Vessel created successfully!");
      setForm({ name: "", imoNumber: "", flag: "", type: "", lastInspection: "" });

      // Clear message after 3 seconds
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("❌ " + (err?.response?.data?.message || "Error adding vessel"));
      setTimeout(() => setMsg(""), 5000);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Add Vessel</h2>

      {/* Message */}
      {msg && (
        <div
          className={`mb-4 p-2 rounded ${
            msg.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {msg}
        </div>
      )}

      <form className="space-y-3" onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          placeholder="IMO Number"
          value={form.imoNumber}
          onChange={(e) => setForm({ ...form, imoNumber: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          placeholder="Flag"
          value={form.flag}
          onChange={(e) => setForm({ ...form, flag: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={form.lastInspection}
          onChange={(e) => setForm({ ...form, lastInspection: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
}
