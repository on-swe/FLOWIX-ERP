"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Plus,
  RefreshCw,
} from "lucide-react";
import { AddInventoryModal } from "@/components/modals/add-inventory-modal";
import { InventoryChart } from "@/components/inventory/inventory-chart";
import { InventoryInsights } from "@/components/inventory/inventory-insights";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Stats } from "@/components/common/stats";
import { mockProducts } from "@/mock/products";
import { InventoryStats as InventoryStatsData } from "@/mock/stats";
import { InventoryList } from "@/components/inventory/inventory-list";




export default function InventoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "Inventory data has been updated",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
      <div>
          <h1 className="text-3xl whitespace-nowrap font-bold tracking-tight text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600 mt-1">
            Track, manage, and optimize your product inventory
          </p>
        </div>
        <div className="flex items-center justify-end w-full space-x-2">
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <AddInventoryModal>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow">
              <Plus className="h-4 w-4 mr-2" />
              Add Inventory
            </Button>
          </AddInventoryModal>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-6">
          <Stats stats={InventoryStatsData} />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <InventoryChart products={mockProducts} />
            </div>
            <div>
              <InventoryInsights products={mockProducts} />
            </div>
          </div>
        </div>

        <div>
          <InventoryList />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
