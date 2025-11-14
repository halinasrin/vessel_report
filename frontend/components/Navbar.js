import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    setUser(null);
    window.location.href = "/";
  };

  // Only render navbar links if user is logged in
  if (!user) return null;

  return (
    <nav className="bg-white shadow p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-lg">Vessel Issue Reporting</div>
        <div className="space-x-4">
          <Link href="/dashboard">Dashboard</Link>

          {/* Admin-only link */}
          {user.role === "ADMIN" && <Link href="/vessels/add">Add Vessel</Link>}

          <Link href="/vessels">Vessels</Link>
          {user.role === "FLEETMANAGER" && <Link href="/issues/report">Report Issue</Link>}
          <Link href="/issues/my">My Issues</Link>

          <span className="ml-4">{user.name} ({user.role})</span>
          <button
            onClick={logout}
            className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
