import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TodayFoodList({ logs, onDelete }) {
  if (!logs || logs.length === 0) {
    return (
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 text-lg">Today's Food Log</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-6">
            No food logged yet today. Click "Add Food" to start tracking!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-emerald-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 text-lg">
          Today's Food Log ({logs.length} items)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log._id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-emerald-50 transition-colors group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {log.foodId?.name || "Unknown"}
                  </span>
                  <span className="text-xs text-gray-400">
                    ×{log.quantity}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {Math.round((log.foodId?.calories || 0) * log.quantity)} kcal ·
                  P: {Math.round((log.foodId?.protein || 0) * log.quantity)}g ·
                  C: {Math.round((log.foodId?.carbs || 0) * log.quantity)}g ·
                  F: {Math.round((log.foodId?.fat || 0) * log.quantity)}g
                </div>
              </div>
              {onDelete && (
                <button
                  onClick={() => onDelete(log._id)}
                  className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 text-sm px-2"
                  title="Remove"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default TodayFoodList;
