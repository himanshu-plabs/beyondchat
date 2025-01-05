import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Home, HelpCircle, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavigationHeaderProps {
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({
  showProgress = false,
  currentStep = 1,
  totalSteps = 5,
}) => {
  const { data: session } = useSession();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between mx-auto w-full">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <motion.span
              className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              BeyondChat
            </motion.span>
          </Link>
        </div>

        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="hidden md:flex flex-1 items-center justify-center"
            >
              <div className="w-full max-w-md">
                <Progress value={progress} className="h-3 rounded-lg" />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {session && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden md:flex gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    <LogOut className="h-4 w-4" />
                    Save & Exit
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Save your progress and return to dashboard
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden"
                size="icon"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  {session?.user?.image && (
                    <Avatar>
                      <AvatarImage src={session.user.image} alt="Profile" />
                      <AvatarFallback>
                        {session.user.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span>{session?.user?.name || "Menu"}</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {session && (
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/dashboard")}
                    className="flex items-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Save & Exit
                  </Button>
                )}
                <Button
                  variant="outline"
                  asChild
                  className="flex items-center gap-2"
                >
                  <Link href="/help">
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden px-4 pb-3"
          >
            <Progress value={progress} className="h-3 rounded-lg" />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium">
                {Math.round(progress)}% Complete
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
