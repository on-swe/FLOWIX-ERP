"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  LayoutDashboard,
  Package,
  Box,
  ShoppingCart,
  Truck,
  Users,
  Building2,
  CreditCard,
  UserCheck,
  Briefcase,
  BarChart3,
  HelpCircle,
  Building,
} from "lucide-react";
import { SettingsDialog } from "@/components/features/settings/SettingsDialog";
import { useAuth } from "@/hooks/auth/use-auth";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/features/auth/LoginDialog";
import { RegisterDialog } from "@/components/features/auth/RegisterDialog";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: Box,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Sales",
    href: "/dashboard/sales",
    icon: ShoppingCart,
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "Procurement",
    href: "/dashboard/procurement",
    icon: Truck,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: Users,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    name: "Vendors",
    href: "/dashboard/vendors",
    icon: Building2,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Finance",
    href: "/dashboard/finance",
    icon: CreditCard,
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    name: "HR",
    href: "/dashboard/hr",
    icon: UserCheck,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    name: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
    gradient: "from-red-500 to-pink-600",
  },
  {
    name: "Organization",
    href: "/dashboard/organization",
    icon: Building,
    gradient: "from-slate-500 to-gray-600",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const {
    user,
    isAuthenticated,
    logout,
    isAuthOpen,
    setIsAuthOpen,
    authMode,
    setAuthMode,
  } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openAuth = (mode: "sign-in" | "sign-up") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="px-0 group-data-[collapsible=icon]:justify-center"
              tooltip={"Flowix ERP"}
            >
              <div className="relative flex w-10 h-10 items-center justify-center overflow-hidden rounded-xl bg-black shadow-lg">
                <img
                  src="/logo/logo.png"
                  alt="Flowix"
                  className="h-7 w-7 object-contain"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden ml-3">
                <span className="truncate font-bold text-xl tracking-tight text-foreground">FLOWIX</span>
                <span className="truncate text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">
                  Enterprise edition
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-3 gap-0 overflow-hidden flex flex-col h-full bg-sidebar">
        <SidebarGroup className="px-0 py-4 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              placeholder="Search features..."
              className="h-10 rounded-xl bg-muted/40 pl-9 text-sm focus-visible:ring-1 focus-visible:ring-primary/20 border-border/40 border shadow-none placeholder:text-muted-foreground/50"
            />
          </div>
        </SidebarGroup>

        <SidebarGroup className="px-0 flex-1 overflow-y-auto no-scrollbar">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-4 mt-2">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                      className={cn(
                        "h-11 rounded-xl px-2.5 transition-all duration-200 group relative",
                        isActive
                          ? "!bg-black !text-white shadow-md font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <Link href={item.href} prefetch={false}>
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-white/10"
                            : "bg-muted group-hover:bg-background"
                        )}
                      >
                        <item.icon className={cn("h-4 w-4", isActive ? "!text-white" : "text-muted-foreground")} />
                      </div>
                      <span className="truncate text-sm ml-3 font-medium">{item.name}</span>
                      {isActive && (
                        <div className="ml-auto flex items-center">
                          <div className={cn("h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]")} />
                        </div>
                      )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/20 p-4 bg-sidebar">
        {isAuthenticated && user ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="h-14 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-2xl transition-all border border-transparent hover:border-border/50"
                  >
                    <Avatar className="h-10 w-10 rounded-xl border border-border/50 shadow-sm">
                      <AvatarImage src="/avatar-profile.jpg" />
                      <AvatarFallback className="rounded-xl bg-black text-white font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight ml-3">
                      <span className="truncate font-bold text-foreground">
                        {user.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground font-medium">
                        Flowix Administrator
                      </span>
                    </div>
                    <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl p-2 shadow-2xl border-border/50"
                  side="right"
                  align="end"
                  sideOffset={12}
                >
                  <DropdownMenuLabel className="p-3 font-normal">
                    <div className="flex items-center gap-3 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-10 w-10 rounded-xl border border-border/50">
                        <AvatarImage src="/avatar-profile.jpg" />
                        <AvatarFallback className="rounded-xl bg-black text-white font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-bold text-foreground">
                          {user.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground font-medium">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2 opacity-50" />
                  <DropdownMenuGroup className="gap-1 flex flex-col">
                    <DropdownMenuItem
                      className="cursor-pointer rounded-xl h-11 gap-3 focus:bg-sidebar-accent transition-colors"
                      onSelect={() => setIsSettingsOpen(true)}
                    >
                      <div className="bg-muted p-1.5 rounded-lg border border-border/40">
                         <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="font-semibold text-sm">Account Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-2 opacity-50" />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 rounded-xl h-11 gap-3 transition-colors"
                    onSelect={logout}
                  >
                    <div className="bg-destructive/10 p-1.5 rounded-lg">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-sm">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <div className="group-data-[collapsible=icon]:hidden p-1">
             <Button
              className="w-full h-11 rounded-2xl font-bold shadow-lg bg-black text-white hover:bg-gray-900 transition-all"
              onClick={() => openAuth("sign-in")}
            >
              Login to Flowix
            </Button>
          </div>
        )}
      </SidebarFooter>

      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      <LoginDialog
        open={isAuthOpen && authMode === "sign-in"}
        onOpenChange={setIsAuthOpen}
        onSwitchToRegister={() => setAuthMode("sign-up")}
      />
      <RegisterDialog
        open={isAuthOpen && authMode === "sign-up"}
        onOpenChange={setIsAuthOpen}
        onSwitchToLogin={() => setAuthMode("sign-in")}
      />
    </Sidebar>
  );
}
