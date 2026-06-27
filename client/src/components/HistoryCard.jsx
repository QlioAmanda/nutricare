import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function HistoryCard({ day }) {
  // Format the date nicely
  const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="border-emerald-100 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-gray-100 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-gray-900 text-lg font-bold">
            {formattedDate}
          </CardTitle>
          <span className="font-semibold text-emerald-600">
            {Math.round(day.totalCalories)} kcal
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {day.foods.length > 0 ? (
          <ul className="space-y-3">
            {day.foods.map((food) => (
              <li key={food._id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-gray-700 font-medium">{food.foodName}</span>
                  <span className="text-gray-400 text-xs">× {food.quantity}</span>
                </div>
                <span className="text-gray-500 font-medium">{food.calories} kcal</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm text-center">No foods logged.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default HistoryCard;
