"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, Menu, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <img
                      src="/placeholder-avatar.jpg"
                      alt="User"
                      className="rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
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
          className={cn(
            "fixed left-0 z-40 h-[calc(100vh-4rem)] w-64 -translate-x-full border-r bg-background transition-transform lg:translate-x-0",
            isSidebarOpen && "translate-x-0"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Conversations
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Analytics
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Knowledge Base
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Settings
                  </Button>
                </div>
              </div>
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold">
                  Training & Setup
                </h2>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    Website Crawler
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Custom Training
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Integration
                  </Button>
                </div>
              </div>
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold">Support</h2>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    Documentation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Help Center
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Feedback
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
