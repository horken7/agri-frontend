
"use client";

import * as React from "react"; // Added this line
import type { SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Leaf, List, Tractor, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Using Leaf as a placeholder for SproutIcon
const AppLogo = (props: SVGProps<SVGSVGElement>) => <Leaf {...props} />;

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: "/tools", label: "Tool Gallery", icon: Tractor },
  { href: "/bulls", label: "Bulls List", icon: List },
];

function DesktopSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="hidden border-r bg-sidebar text-sidebar-foreground md:block">
      <SidebarHeader className="p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary"
        >
          <AppLogo className="h-7 w-7" />
          <span className="font-semibold">AgriTool Hub</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                className="justify-start"
                tooltip={{children: item.label, side: "right", align: "center"}}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

function MobileSheetNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0 bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary"
          >
            <AppLogo className="h-7 w-7" />
            <span className="font-semibold">AgriTool Hub</span>
          </Link>
        </SidebarHeader>
        <nav className="grid gap-2 text-lg font-medium p-4">
           {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-primary-foreground hover:bg-sidebar-primary",
                (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}


export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <DesktopSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 md:pl-[var(--sidebar-width-icon)] group-data-[state=expanded]/sidebar-wrapper:md:pl-[var(--sidebar-width)] transition-[padding-left] duration-200 ease-linear">
           <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileSheetNav />
            {/* Breadcrumbs or other header content can go here */}
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
