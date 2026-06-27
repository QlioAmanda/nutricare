import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function FoodTable({ foods, onEdit, onDelete }) {
  if (!foods || foods.length === 0) {
    return <div className="p-8 text-center text-gray-500">No foods found.</div>;
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold">Food Name</TableHead>
            <TableHead className="font-semibold text-right">Calories</TableHead>
            <TableHead className="font-semibold text-right">Protein</TableHead>
            <TableHead className="font-semibold text-right">Carbs</TableHead>
            <TableHead className="font-semibold text-right">Fat</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foods.map((food) => (
            <TableRow key={food._id} className="hover:bg-emerald-50/50">
              <TableCell className="font-medium text-gray-900">{food.name}</TableCell>
              <TableCell className="text-right">{food.calories} kcal</TableCell>
              <TableCell className="text-right">{food.protein}g</TableCell>
              <TableCell className="text-right">{food.carbs}g</TableCell>
              <TableCell className="text-right">{food.fat}g</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(food)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${food.name}?`)) {
                      onDelete(food._id);
                    }
                  }}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default FoodTable;
