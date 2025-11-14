import { useState } from "react";
import axios from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function ReportIssue() {
  const [form, setForm] = useState({
    vesselId: "",
    category: "",
    description: "",
    priority: "Medium",
  });
  const [msg, setMsg] = useState("");

  const { data: vessels, isLoading, error } = useQuery({
    queryKey: ["myvessels"],
    queryFn: async () => {
      const res = await axios.get("/vessels");
      return res.data;
    },
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/issues", form);
      setMsg("Issue reported successfully!");
      setForm({ vesselId: "", category: "", description: "", priority: "Medium" });
    } catch (err) {
      setMsg(err?.response?.data?.message || "Error reporting issue");
    }
  };

  if (isLoading) return <div>Loading vessels...</div>;
  if (error) return <div>Error loading vessels</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl mb-4 font-bold">Report Issue</h2>
      {msg && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{msg}</div>}
      <form className="space-y-3" onSubmit={submit}>
        <select
          value={form.vesselId}
          onChange={(e) => setForm({ ...form, vesselId: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Vessel</option>
          {vessels?.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.imoNumber})
            </option>
          ))}
        </select>

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
