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
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
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
      className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-xl"
    >
      {/* Progress bar */}
      {showProgress && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary to-purple-500"
          />
        </div>
      )}

      <div className="container flex h-16 items-center justify-between mx-auto w-full px-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl" />
              <span className="relative font-bold text-xl bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                BeyondChat
              </span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
