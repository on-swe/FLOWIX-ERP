"use client";

import type React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
          <div className="sticky top-0 z-20">
            <DashboardHeader />
          </div>
          <main className="py-6">
            <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}