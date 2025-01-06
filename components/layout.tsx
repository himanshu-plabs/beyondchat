"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Bell,
  HelpCircle,
  Menu,
  Search,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();
  // Close sidebar on mobile when clicking outside
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
      {/* Top Navigation */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <Button
            variant="ghost"
            className="mr-2 px-2 hover:bg-transparent lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">Beyond Chat</span>
            </div>

            <div className="flex flex-1 items-center justify-center px-4">
              <div className="w-full max-w-xl">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-8" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full ring-2 ring-primary/10 transition-all hover:ring-4"
                  >
                    <img
                      src="/placeholder-avatar.jpg"
                      alt="User"
                      className="rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <img
                      src="/placeholder-avatar.jpg"
                      alt="User"
                      className="h-6 w-6 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">
                        john@example.com
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      signOut();
                      router.push("/");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex pt-16">
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
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <Home className="h-5 w-5" /> Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <MessageSquare className="h-5 w-5" /> Conversations
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <BarChart2 className="h-5 w-5" /> Analytics
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <BookOpen className="h-5 w-5" /> Knowledge Base
                  </Button>
                  <Button
                    variant="ghost"
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
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <Globe className="h-5 w-5" /> Website Crawler
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <BookMarked className="h-5 w-5" /> Custom Training
                  </Button>
                  <Button
                    variant="ghost"
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
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <FileText className="h-5 w-5" /> Documentation
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-accent"
                  >
                    <Help className="h-5 w-5" /> Help Center
                  </Button>
                  <Button
                    variant="ghost"
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
