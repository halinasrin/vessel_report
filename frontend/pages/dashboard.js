import axios from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vessels"],
    queryFn: async () => {
      const res = await axios.get("/vessels");
      console.log("Vessels:", res.data); // debug
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong! {error.message}</div>;

  if (!data || data.length === 0)
    return <div>No vessels assigned.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((v) => {
          const openIssues = v?.issues?.filter((i) => i.status !== "Closed")
            ?.length || 0;

          return (
            <div
              key={v.id}
              className="bg-white p-4 rounded shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">{v.name}</h3>
                <p>IMO: {v.imoNumber}</p>
                <p>Type: {v.type}</p>
                <p>Status: {v.status}</p>
                <p>Open Issues: {openIssues}</p>
              </div>

              <Link
                href={`/vessels/${v.id}`}
                className="mt-2 text-blue-600 underline"
              >
                Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
