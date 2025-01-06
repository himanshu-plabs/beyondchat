import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

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
        <DialogHeader>
          <DialogTitle>Training Progress</DialogTitle>
          <DialogDescription>Building your AI knowledge base</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Current Phase</div>
              <div className="text-sm text-muted-foreground">
                {getPhase(progress)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Estimated Time</div>
              <div className="text-sm text-muted-foreground">
                {getEstimatedTime(progress)} minutes remaining
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Pages Processed</div>
              <div className="text-sm text-muted-foreground">
                {Math.floor((approvedPages * progress) / 100)} / {approvedPages}{" "}
                pages
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Processing Rate</div>
              <div className="text-sm text-muted-foreground">
                ~{Math.ceil(approvedPages / getEstimatedTime(progress))}{" "}
                pages/minute
              </div>
            </div>
          </div>
          {progress === 100 && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/10 p-4">
              <div className="text-sm font-medium text-green-800 dark:text-green-100">
                Training Complete
              </div>
              <div className="mt-1 text-sm text-green-700 dark:text-green-100">
                Your AI model has been successfully trained with the approved
                content.
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
