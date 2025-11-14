import Link from "next/link";
import axios from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function VesselsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["vessels"],
    queryFn: async () => {
      const res = await axios.get("/vessels");
      return res.data;
    },
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Vessels</h1>

        {/* Only show Add Vessel button if user exists AND is ADMIN */}
        {user && user.role === "ADMIN" && (
          <Link
            href="/vessels/add"
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Add Vessel
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {data?.map((v) => (
          <div key={v.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{v.name}</h3>
            <p>IMO: {v.imoNumber}</p>
            <p>Type: {v.type}</p>
            <p>Status: {v.status}</p>

            <Link href={`/vessels/${v.id}`} className="text-blue-600">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
