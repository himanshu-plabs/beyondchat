import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrainingPage } from "@/lib/sample-data";
import { motion } from "framer-motion";
import { FileText, ThumbsUp, ThumbsDown, X, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContentPreviewProps {
  content: TrainingPage | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ContentPreview({
  content,
  onClose,
  onApprove,
  onReject,
}: ContentPreviewProps) {
  if (!content) return null;

  return (
    <Dialog open={!!content} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white backdrop-blur-xl border-primary/10 p-6">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Content Preview
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Review the content before approving or rejecting
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">URL</div>
            <div className="flex items-center gap-2 font-mono text-sm text-primary">
              <Link2 className="h-4 w-4" />
              {content?.url}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Content
            </div>
            <ScrollArea className="h-[300px] rounded-lg border border-primary/10 bg-white/50 backdrop-blur-sm p-4">
              <div className="text-sm leading-relaxed">{content?.content}</div>
            </ScrollArea>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Category
              </div>
              <Badge
                variant="outline"
                className="bg-white/50 backdrop-blur-sm border-primary/10"
              >
                {content?.category}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Word Count
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">
                  {content?.wordCount?.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Relevance Score
              </div>
              <div className="text-sm">
                {(content?.relevanceScore
                  ? content.relevanceScore * 100
                  : 0
                ).toFixed(0)}
                %
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-primary/10 hover:bg-primary/5 hover:text-primary"
            >
              Close
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onReject(content.id);
                onClose();
              }}
              disabled={content.status === "rejected"}
              className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30 disabled:border-muted disabled:text-muted-foreground"
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={() => {
                onApprove(content.id);
                onClose();
              }}
              disabled={content.status === "approved"}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-primary/20"
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
