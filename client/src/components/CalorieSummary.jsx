import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function CalorieSummary({ calories }) {
  if (!calories) return null;
  const percentage = Math.min((calories.consumed / calories.target) * 100, 100);

  return (
    <Card className="border-emerald-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 text-lg">Calories Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-4xl font-bold text-emerald-600">{calories.consumed}</span>
            <span className="text-gray-500 ml-2">/ {calories.target} kcal</span>
          </div>
          <span className="text-sm font-medium text-gray-500">{calories.target - calories.consumed} kcal left</span>
        </div>
        <Progress value={percentage} className="h-3 bg-emerald-100" indicatorclassname="bg-emerald-600" />
      </CardContent>
    </Card>
  );
}

export default CalorieSummary;
