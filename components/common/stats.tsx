
import {
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AreaChart } from "@tremor/react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";


interface InventoryStatsProps {
  stats: {
    name: string;
    value: string;
    change: string;
    changeType: string;
    icon: React.ReactNode;
    chartData: { month: string; value: number }[];
  }[];
}
export function Stats({ stats }: InventoryStatsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "Inventory stats have been updated",
      });
    }, 1000);
  };

  return (
    <div className="flex gap-6 flex-wrap">
      {stats.map((stat) => (
        <Card
          key={stat.name}
          className="flex-1 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.name}
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <stat.icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {stat.value}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {stat.changeType === "positive" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <p
                  className={`text-xs font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div className="h-12 w-20">
                <AreaChart
                  data={stat.chartData}
                  index="month"
                  categories={["value"]}
                  colors={stat.changeType === "positive" ? ["green"] : ["red"]}
                  showXAxis={false}
                  showYAxis={false}
                  showLegend={false}
                  showGridLines={false}
                  curveType="monotone"
                  className="h-12"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
