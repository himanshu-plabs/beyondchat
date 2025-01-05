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
      </div>
    </motion.header>
  );
};
