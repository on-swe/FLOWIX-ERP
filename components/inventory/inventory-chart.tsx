import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Product {
  status: "in-stock" | "low-stock" | "out-of-stock";
  category: string;
}

interface InventoryChartProps {
  products: Product[];
}

export function InventoryChart({ products }: InventoryChartProps) {
  // Prepare data for category distribution
  const categoryData = products.reduce((acc, product) => {
    const existingCategory = acc.find(item => item.name === product.category);
    if (existingCategory) {
      existingCategory.total += 1;
    } else {
      acc.push({ name: product.category, total: 1 });
    }
    return acc;
  }, [] as { name: string; total: number }[]);

  // Prepare data for status distribution
  const statusCounts = products.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Inventory Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* <div>
          <h3 className="text-sm font-medium mb-4">Stock Status Distribution</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <PackageCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">In Stock</p>
                <p className="font-semibold">{statusCounts["in-stock"] || 0}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="p-2 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Low Stock</p>
                <p className="font-semibold">{statusCounts["low-stock"] || 0}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <div className="p-2 bg-red-100 rounded-full">
                <PackageX className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Out of Stock</p>
                <p className="font-semibold">{statusCounts["out-of-stock"] || 0}</p>
              </div>
            </div>
          </div>
        </div> */}

        <div>
          <h3 className="text-sm font-medium mb-8">Category Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#888" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#888" 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="total" 
                  fill="#000000" 
                  radius={[4, 4, 0, 0]}
                  name="Products"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}