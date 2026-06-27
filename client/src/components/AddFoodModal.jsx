import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AddFoodModal({ onFoodAdded }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length < 1) {
      setFoods([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/foods?search=${encodeURIComponent(search)}`
        );
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleAdd = async () => {
    if (!selectedFood) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          foodId: selectedFood._id,
          quantity,
        }),
      });

      if (res.ok) {
        setOpen(false);
        setSearch("");
        setSelectedFood(null);
        setQuantity(1);
        setFoods([]);
        if (onFoodAdded) onFoodAdded();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
            + Add Food
          </Button>
        } 
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Food to Today's Log</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {!selectedFood ? (
            <>
              <Input
                placeholder="Search food... (e.g. Nasi Putih)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <div className="max-h-60 overflow-y-auto space-y-1">
                {foods.map((food) => (
                  <button
                    key={food._id}
                    onClick={() => setSelectedFood(food)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{food.name}</span>
                      <span className="text-sm text-gray-500">{food.calories} kcal</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      P: {food.protein}g · C: {food.carbs}g · F: {food.fat}g
                    </div>
                  </button>
                ))}
                {search.length > 0 && foods.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">No food found.</p>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <h4 className="font-semibold text-gray-900">{selectedFood.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Per serving: {selectedFood.calories} kcal · P: {selectedFood.protein}g · C: {selectedFood.carbs}g · F: {selectedFood.fat}g
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity (servings)
                </label>
                <Input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">Total nutrients:</p>
                <p>Calories: {Math.round(selectedFood.calories * quantity)} kcal</p>
                <p>Protein: {Math.round(selectedFood.protein * quantity)}g · Carbs: {Math.round(selectedFood.carbs * quantity)}g · Fat: {Math.round(selectedFood.fat * quantity)}g</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedFood(null)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {loading ? "Adding..." : "Add to Log"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddFoodModal;
