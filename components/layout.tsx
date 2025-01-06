"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  MessageSquare,
  BarChart2,
  BookOpen,
  Settings,
  Globe,
  BookMarked,
  Plug,
  FileText,
  HelpCircle as Help,
  MessageCircle,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NavigationHeader } from "@/components/layout/NavigationHeader";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isDesktop && isSidebarOpen) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktop, isSidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader
        showMenu
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          id="sidebar"
          className={cn(
            "fixed left-0 z-40 h-[calc(100vh-4rem)] w-64 -translate-x-full border-r bg-background shadow-lg transition-transform lg:shadow-none",
            "lg:translate-x-0",
            isSidebarOpen && "translate-x-0"
          )}
        >
          <ScrollArea className="h-full py-6">
            <div className="space-y-4">
              <div className="px-3">
                <div className="space-y-1">
                  <Button
                    variant={pathname === "/dashboard" ? "primary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-accent hover:text-white"
                  >
                    <Home className="h-5 w-5" /> Dashboard
                  </Button>
                  <Button
                    variant={
                      pathname === "/conversations" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <MessageSquare className="h-5 w-5" /> Conversations
                  </Button>
                  <Button
                    variant={pathname === "/analytics" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <BarChart2 className="h-5 w-5" /> Analytics
                  </Button>
                  <Button
                    variant={pathname === "/knowledge" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <BookOpen className="h-5 w-5" /> Knowledge Base
                  </Button>
                  <Button
                    variant={pathname === "/settings" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <Settings className="h-5 w-5" /> Settings
                  </Button>
                </div>
              </div>
              <Separator className="mx-3" />
              <div className="px-3">
                <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight">
                  Training & Setup
                </h2>
                <div className="space-y-1">
                  <Button
                    variant={pathname === "/crawler" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <Globe className="h-5 w-5" /> Website Crawler
                  </Button>
                  <Button
                    variant={pathname === "/training" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <BookMarked className="h-5 w-5" /> Custom Training
                  </Button>
                  <Button
                    variant={
                      pathname === "/integration" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <Plug className="h-5 w-5" /> Integration
                  </Button>
                </div>
              </div>
              <Separator className="mx-3" />
              <div className="px-3">
                <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight">
                  Support
                </h2>
                <div className="space-y-1">
                  <Button
                    variant={pathname === "/docs" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <FileText className="h-5 w-5" /> Documentation
                  </Button>
                  <Button
                    variant={pathname === "/help" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <Help className="h-5 w-5" /> Help Center
                  </Button>
                  <Button
                    variant={pathname === "/feedback" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <MessageCircle className="h-5 w-5" /> Feedback
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto px-4 py-8 lg:px-8",
            isDesktop && "ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
