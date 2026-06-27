import { useState, useEffect } from "react";
import FoodTable from "../components/FoodTable";
import FoodDialog from "../components/FoodDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Admin() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const fetchFoods = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/foods?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchFoods();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/foods/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchFoods();
      } else {
        alert("Failed to delete food. Are you an admin?");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenAdd = () => {
    setEditingFood(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (food) => {
    setEditingFood(food);
    setDialogOpen(true);
  };

  const handleSave = () => {
    setDialogOpen(false);
    fetchFoods();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage food database</p>
        </div>
        
        <div className="flex gap-4">
          <Input 
            placeholder="Search foods..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
          <Button onClick={handleOpenAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0">
            + New Food
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading foods...</div>
      ) : (
        <FoodTable foods={foods} onEdit={handleOpenEdit} onDelete={handleDelete} />
      )}

      <FoodDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        food={editingFood} 
        onSave={handleSave} 
      />
    </div>
  );
}

export default Admin;
