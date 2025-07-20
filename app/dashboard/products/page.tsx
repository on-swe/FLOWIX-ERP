"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddProductModal } from "@/components/modals/add-product-modal";
import { ProductList } from "@/components/products/product-list";
import { productsStats as productsStatsData } from "@/mock/stats";
import { Stats } from "@/components/common/stats";

export default function AdvancedProductsTable() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  return (
    <div className="flex-1 space-y-8">
      <div className="flex flex-col gap-4 justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Product Inventory
          </h2>
          <p className="text-muted-foreground">
            Manage your product inventory and catalog
          </p>
        </div>
        <div className="flex items-center space-x-2 w-full justify-end">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Stats stats={productsStatsData} />

      {/* Advanced Products Table */}
      <ProductList />
      <AddProductModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  );
}
