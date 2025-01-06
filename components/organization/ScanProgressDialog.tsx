import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
  const getStatusMessage = () => {
    if (error) return "Scan failed";
    if (progress < 30) return "Checking website health...";
    if (progress < 60) return "Discovering pages...";
    if (progress < 90) return "Extracting content...";
    return "Finalizing scan...";
  };

  const getStatusIcon = () => {
    if (error) {
      return <AlertCircle className="h-6 w-6 text-destructive" />;
    }
    if (progress === 100) {
      return <CheckCircle2 className="h-6 w-6 text-primary" />;
    }
    return (
      <div className="relative">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    );
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              {getStatusIcon()}
              <span>Website Scan {error ? "Failed" : "Progress"}</span>
            </DialogTitle>
            <DialogDescription className="text-base">
              {error ||
                "We're analyzing your website to build your AI knowledge base"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="relative">
              <Progress
                value={progress}
                className={cn(
                  "h-3 rounded-full transition-all",
                  error ? "bg-destructive/20" : "bg-primary/20"
                )}
                indicatorClassName={cn(
                  "transition-all duration-500 ease-in-out rounded-full",
                  error ? "bg-destructive" : "bg-primary"
                )}
              />
              <AnimatePresence>
                {!error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 top-0 -translate-y-6 text-sm font-medium"
                  >
                    {progress}%
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg bg-muted p-4"
            >
              <p className="text-sm font-medium text-center">
                {getStatusMessage()}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
