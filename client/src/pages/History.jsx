import { useState, useEffect } from "react";
import HistoryCard from "../components/HistoryCard";

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/tracker/history", {
          credentials: "include",
        });
        const data = await res.json();
        setHistoryData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading history...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nutrition History</h1>
        <p className="text-gray-500 mt-1">Review your past daily intakes.</p>
      </div>

      {historyData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
          <span className="text-4xl mb-4 block">📅</span>
          <h3 className="text-lg font-medium text-gray-900">No History Yet</h3>
          <p className="text-gray-500 mt-1">Start logging your food today to see it here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {historyData.map((day) => (
            <HistoryCard key={day.date} day={day} />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
