import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RocketIcon, CheckIcon, XIcon, Loader2 } from "lucide-react";
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
      <DialogContent className="w-[90vw] max-w-md mx-auto bg-white backdrop-blur-xl border-primary/10 p-6">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
              <RocketIcon className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Verifying Integration
            </DialogTitle>
          </div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 py-4"
        >
          <AnimatePresence mode="wait">
            {results.map((result) => (
              <motion.div
                key={result.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-primary/10 shadow-sm"
              >
                <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                  {result.status === "pending" && (
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  )}
                  {result.status === "success" && (
                    <CheckIcon className="h-4 w-4 text-emerald-500" />
                  )}
                  {result.status === "error" && (
                    <XIcon className="h-4 w-4 text-rose-500" />
                  )}
                </div>
                <p className="text-sm flex-1 text-muted-foreground">
                  {result.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
