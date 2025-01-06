import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Globe,
  Search,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ScanProgressDialogProps {
  isOpen: boolean;
  progress: number;
  error?: string;
}

export function ScanProgressDialog({
  isOpen,
  progress,
  error,
}: ScanProgressDialogProps) {
  const getStatusInfo = () => {
    if (error) return { message: "Scan failed", icon: AlertCircle };
    if (progress < 30)
      return { message: "Checking website health...", icon: Globe };
    if (progress < 60) return { message: "Discovering pages...", icon: Search };
    if (progress < 90)
      return { message: "Extracting content...", icon: FileText };
    return { message: "Finalizing scan...", icon: CheckCircle2 };
  };

  const getStatusIcon = () => {
    if (error) {
      return (
        <div className="relative inline-flex">
          <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2 sm:h-3 sm:w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/75 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-destructive"></span>
          </span>
        </div>
      );
    }
    if (progress === 100) {
      return (
        <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 animate-bounce" />
      );
    }
    return (
      <div className="relative">
        <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/50"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    );
  };

  const statusInfo = getStatusInfo();

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-[95vw] max-w-md mx-auto backdrop-blur-sm bg-background/95 p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 sm:space-y-6"
        >
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold">
              {getStatusIcon()}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Website Scan {error ? "Failed" : "Progress"}
              </span>
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base font-medium text-muted-foreground">
              {error ||
                "We're analyzing your website to build your AI knowledge base"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 sm:space-y-8 py-2 sm:py-4">
            <div className="relative">
              <Progress
                value={progress}
                className={cn(
                  "h-3 sm:h-4 rounded-full transition-all",
                  error ? "bg-destructive/20" : "bg-primary/20"
                )}
                indicatorClassName={cn(
                  "transition-all duration-500 ease-in-out rounded-full bg-gradient-to-r",
                  error
                    ? "from-destructive/80 to-destructive"
                    : "from-primary/80 to-primary shadow-lg shadow-primary/20"
                )}
              />
              <AnimatePresence>
                {!error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 top-0 -translate-y-6 sm:-translate-y-7 text-sm font-bold text-primary"
                  >
                    {progress}%
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl bg-muted/50 p-4 sm:p-6 shadow-lg backdrop-blur-sm border border-border/50"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <statusInfo.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <p className="text-xs sm:text-sm font-semibold">
                  {statusInfo.message}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
