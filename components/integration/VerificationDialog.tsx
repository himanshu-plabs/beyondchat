import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RocketIcon, CheckIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TestResult {
  step: "initial" | "deep" | "complete";
  status: "success" | "error" | "pending";
  message: string;
}

interface VerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: TestResult[];
}

export const VerificationDialog = ({
  open,
  onOpenChange,
  results,
}: VerificationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-md mx-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <RocketIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            Verifying Integration
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
          <AnimatePresence>
            {results.map((result) => (
              <motion.div
                key={result.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-md bg-secondary/30"
              >
                {result.status === "pending" && (
                  <div className="h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-primary border-t-transparent shrink-0" />
                )}
                {result.status === "success" && (
                  <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" />
                )}
                {result.status === "error" && (
                  <XIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 shrink-0" />
                )}
                <p className="text-xs sm:text-sm flex-1">{result.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};
