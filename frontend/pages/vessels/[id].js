import { useRouter } from "next/router";
import axios from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function VesselDetail() {
  const router = useRouter();
  const id = router.query.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["vessel", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axios.get(`/vessels/${id}`);
      return res.data;
    },
    enabled: !!id, // wait until id is available
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading vessel</div>;
  if (!data) return <div>No vessel found</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">
        {data.name} ({data.imoNumber})
      </h2>
      <p>Type: {data.type}</p>
      <p>Flag: {data.flag}</p>
      <p>Status: {data.status}</p>
      <p>
        Last Inspection:{" "}
        {data.lastInspection
          ? new Date(data.lastInspection).toLocaleDateString()
          : "-"}
      </p>

      <h3 className="mt-4 font-bold">Issues</h3>
      <div className="space-y-2">
        {data.issues?.length > 0 ? (
          data.issues.map((i) => (
            <div key={i.id} className="p-2 border rounded">
              <div className="font-semibold">
                {i.category} — {i.priority}
              </div>
              <div>{i.description}</div>
              <div className="text-sm text-gray-600">Status: {i.status}</div>
            </div>
          ))
        ) : (
          <div>No issues reported</div>
        )}
      </div>
    </div>
  );
}
