import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, AlertTriangle, ArrowUp, ArrowDown, TrendingUp } from "lucide-react";

interface Product {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

interface InventoryInsightsProps {
  products: Product[];
}

export function InventoryInsights({ products }: InventoryInsightsProps) {
  // Calculate insights
  const lowStockItems = products.filter(p => p.status === "low-stock");
  const outOfStockItems = products.filter(p => p.status === "out-of-stock");
  const excessStockItems = products.filter(p => p.stock > p.minStock * 3);
  const fastMovingItems = products.slice(0, 3).map(p => p.name); // Simplified for demo

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
          Inventory Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-red-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Immediate Attention Needed</h4>
              <p className="text-sm text-gray-600">
                {outOfStockItems.length} items are out of stock and {lowStockItems.length} items are running low.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Excess Inventory</span>
            <span className="text-sm text-gray-500">{excessStockItems.length} items</span>
          </div>
          <div className="flex flex-col gap-2 items-start justify-between">
            <span className="text-sm font-medium">Fast Moving Items</span>
            <span className="text-sm text-gray-500">{fastMovingItems.join(", ")}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Reorder Suggestions</span>
            <span className="text-sm text-gray-500">{lowStockItems.length} items</span>
          </div>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <div>
              <h4 className="font-medium">Inventory Optimization</h4>
              <p className="text-sm text-gray-600">
                Consider reducing order quantities for excess stock items to free up capital.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}