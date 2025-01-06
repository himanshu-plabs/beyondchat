import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Clock,
  FileText,
  Gauge,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface TrainingProgressProps {
  progress: number;
  approvedPages: number;
  isOpen: boolean;
}

export function TrainingProgress({
  progress,
  approvedPages,
  isOpen,
}: TrainingProgressProps) {
  const getPhase = (progress: number) => {
    if (progress < 30) return "Data Preparation";
    if (progress < 60) return "Model Training";
    if (progress < 90) return "Fine-tuning";
    return "Finalizing";
  };

  const getEstimatedTime = (progress: number) => {
    return Math.ceil((100 - progress) / 10);
  };

  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-6 w-6 text-primary animate-pulse" />
            Training Progress
          </DialogTitle>
          <DialogDescription className="text-base">
            Building your AI knowledge base with advanced machine learning
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 py-4"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-bold text-primary">
                {progress}%
              </span>
            </div>
            <div className="relative">
              <Progress
                value={progress}
                className="h-3 bg-primary/20"
                indicatorClassName="bg-primary transition-all duration-500 ease-out"
              />
              {/* {progress < 100 && (
                <div className="absolute -top-2 left-[calc(var(--progress)-1%)]">
                  <Loader2 className="h-7 w-7 text-primary animate-spin" />
                </div>
              )} */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-3 items-start">
              <Brain className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1.5">
                <div className="text-sm font-semibold">Current Phase</div>
                <div className="text-sm text-muted-foreground">
                  {getPhase(progress)}
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1.5">
                <div className="text-sm font-semibold">Estimated Time</div>
                <div className="text-sm text-muted-foreground">
                  {getEstimatedTime(progress)} minutes remaining
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1.5">
                <div className="text-sm font-semibold">Pages Processed</div>
                <div className="text-sm text-muted-foreground">
                  {Math.floor((approvedPages * progress) / 100)} /{" "}
                  {approvedPages} pages
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Gauge className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1.5">
                <div className="text-sm font-semibold">Processing Rate</div>
                <div className="text-sm text-muted-foreground">
                  ~{Math.ceil(approvedPages / getEstimatedTime(progress))}{" "}
                  pages/minute
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-4 border border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Training Complete</span>
                </div>
                <div className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
                  Your AI model has been successfully trained with the approved
                  content.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
