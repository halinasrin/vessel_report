import axios from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function MyIssues() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myissues"],
    queryFn: async () => {
      const res = await axios.get("/issues/my");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading issues...</div>;
  if (error) return <div>Error loading issues</div>;
  if (!data || data.length === 0) return <div>No issues found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl mb-4 font-bold">My Issues</h2>
      <div className="space-y-3">
        {data.map((i) => (
          <div key={i.id} className="bg-white p-4 rounded shadow">
            <div className="font-semibold text-lg">
              {i.category} — {i.priority}
            </div>
            <div className="mt-1">{i.description}</div>
            <div className="text-sm text-gray-600 mt-1">
              Vessel: {i.Vessel?.name || i.vesselId} | Status: {i.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
