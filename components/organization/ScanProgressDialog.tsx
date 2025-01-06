import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Globe,
  Search,
  FileText,
  Sparkles,
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
          <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-destructive animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-4 sm:w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/75 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-destructive"></span>
          </span>
        </div>
      );
    }
    if (progress === 100) {
      return (
        <div className="relative inline-flex">
          <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-emerald-500 flex items-center justify-center"
          >
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
          </motion.div>
        </div>
      );
    }
    return (
      <div className="relative">
        <div className="relative inline-flex">
          <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" />
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(var(--primary), 0.2)",
                "0 0 0 8px rgba(var(--primary), 0)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    );
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-white/100 backdrop-blur-xl p-6 sm:p-8 border border-primary/10 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 sm:space-y-8"
        >
          <DialogHeader className="space-y-3 sm:space-y-4">
            <DialogTitle className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl font-bold">
              {getStatusIcon()}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Website Scan {error ? "Failed" : "Progress"}
              </span>
            </DialogTitle>
            <DialogDescription className="text-base sm:text-lg font-medium text-muted-foreground">
              {error ||
                "We're analyzing your website to build your AI knowledge base"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 sm:space-y-10 py-4">
            <div className="relative">
              <Progress
                value={progress}
                className={cn(
                  "h-3 sm:h-4 rounded-full transition-all",
                  error ? "bg-destructive/20" : "bg-primary/20"
                )}
                indicatorClassName={cn(
                  "transition-all duration-500 ease-in-out rounded-full shadow-lg",
                  error
                    ? "bg-gradient-to-r from-destructive/80 to-destructive shadow-destructive/20"
                    : "bg-gradient-to-r from-primary/80 to-primary shadow-primary/20"
                )}
              />
              <AnimatePresence>
                {!error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 translate-y-6 sm:-translate-y-7 text-sm sm:text-base font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                  >
                    {progress}%
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5 p-4 sm:p-6 shadow-lg backdrop-blur-sm border border-primary/10"
            >
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <StatusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <p className="text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
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
