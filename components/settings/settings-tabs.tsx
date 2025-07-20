"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./general-settings";
import { SecuritySettings } from "./security-settings";
import { NotificationSettings } from "./notification-settings";
import { BackupSettings } from "./backup-settings";
import Link from "next/link";

export function SettingsTabs() {
  return (
    <div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="backup">
          <BackupSettings />
        </TabsContent>
      </Tabs>
      <div className="pt-6 md:pt-8 border-t border-[#cdcdcd] text-center text-sm sm:text-base">
        <p className="mb-2">
          &copy; 2025 <strong>FLOWIX</strong>. All rights reserved.
        </p>
        <p>
          Designed and Developed by{" "}
          <Link href="https://raqeem-eg.vercel.app" className="hover:underline">
            <strong>Raqeem - رَقيم</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}
