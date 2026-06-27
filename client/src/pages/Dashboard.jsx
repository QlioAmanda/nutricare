import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CalorieSummary from "../components/CalorieSummary";
import Macronutrients from "../components/Macronutrients";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const resWithAuth = await fetch("http://localhost:8000/api/dashboard/summary", {
          credentials: "include"
        });

        const json = await resWithAuth.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : "NC";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16 bg-emerald-100 text-emerald-700 font-bold text-xl border-2 border-emerald-200">
          <AvatarFallback className="bg-transparent">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
          <p className="text-gray-500 mt-1">Here is your nutrition summary for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CalorieSummary calories={data?.calories} />
        <Macronutrients macros={data?.macros} />
      </div>
    </div>
  );
}

export default Dashboard;
