import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function Macronutrients({ macros }) {
  if (!macros) return null;
  
  // Calculate a generic max for visualization (this will be dynamic in Sprint 3)
  const targetProtein = 80;
  const targetCarbs = 250;
  const targetFat = 70;

  const getPercentage = (value, target) => Math.min((value / target) * 100, 100);

  return (
    <Card className="border-emerald-100 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-gray-900 text-lg">Macronutrients</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">Protein</span>
            <span className="text-gray-500">{macros.protein}g / {targetProtein}g</span>
          </div>
          <Progress value={getPercentage(macros.protein, targetProtein)} className="h-2 bg-blue-100" indicatorclassname="bg-blue-500" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">Carbs</span>
            <span className="text-gray-500">{macros.carbs}g / {targetCarbs}g</span>
          </div>
          <Progress value={getPercentage(macros.carbs, targetCarbs)} className="h-2 bg-amber-100" indicatorclassname="bg-amber-500" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">Fat</span>
            <span className="text-gray-500">{macros.fat}g / {targetFat}g</span>
          </div>
          <Progress value={getPercentage(macros.fat, targetFat)} className="h-2 bg-rose-100" indicatorclassname="bg-rose-500" />
        </div>
      </CardContent>
    </Card>
  );
}

export default Macronutrients;
