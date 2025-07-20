"use client";

import { VendorTable } from "@/components/vendors/vendor-list";
import { AddVendorModal } from "@/components/modals/add-vendor-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Stats } from "@/components/common/stats";
import { vendorStats } from "@/mock/stats";

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Vendor Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage vendor relationships, contracts, and performance metrics
          </p>
        </div>
        <AddVendorModal>
          <Button className="bg-black hover:bg-gray-800 text-white shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </AddVendorModal>
      </div>

      <Stats stats={vendorStats} />
      <VendorTable />
    </div>
  );
}
