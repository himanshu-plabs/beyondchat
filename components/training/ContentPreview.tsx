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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Content Preview</DialogTitle>
          <DialogDescription>
            Review the content before approving or rejecting
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">URL</div>
            <div className="font-mono text-sm">{content?.url}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Content</div>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="text-sm">{content?.content}</div>
            </ScrollArea>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium">Category</div>
              <div className="text-sm text-gray-500">{content?.category}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Word Count</div>
              <div className="text-sm text-gray-500">{content?.wordCount}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Relevance Score</div>
              <div className="text-sm text-gray-500">
                {(content?.relevanceScore
                  ? content.relevanceScore * 100
                  : 0
                ).toFixed(0)}
                %
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onReject(content.id);
                onClose();
              }}
              disabled={content.status === "rejected"}
            >
              Reject
            </Button>
            <Button
              onClick={() => {
                onApprove(content.id);
                onClose();
              }}
              disabled={content.status === "approved"}
            >
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
