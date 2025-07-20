"use client";

import type React from "react";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <div className="sticky top-0 z-20">
          <DashboardHeader />
        </div>
        <main className="py-6">
          <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}