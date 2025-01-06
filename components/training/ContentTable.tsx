import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrainingPage } from "@/lib/sample-data";
import { format } from "date-fns";
import { Eye, Loader2, ThumbsDown, ThumbsUp } from "lucide-react";

interface ContentTableProps {
  pages: TrainingPage[];
  loadingPages: Record<string, boolean>;
  onPreview: (page: TrainingPage) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ContentTable({
  pages,
  loadingPages,
  onPreview,
  onApprove,
  onReject,
}: ContentTableProps) {
  const getStatusBadge = (status: TrainingPage["status"]) => {
    const variants: Record<
      TrainingPage["status"],
      "default" | "secondary" | "destructive"
    > = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">URL</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-[100px]">Words</TableHead>
          <TableHead className="w-[100px]">Relevance</TableHead>
          <TableHead className="w-[120px]">Last Modified</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead className="w-[120px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pages.map((page) => (
          <TableRow key={page.id}>
            <TableCell className="font-mono text-sm truncate">
              <Button
                variant="link"
                className="p-0 h-auto font-mono"
                onClick={() => onPreview(page)}
              >
                {page?.url}
              </Button>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{page?.category}</Badge>
            </TableCell>
            <TableCell>{page?.wordCount?.toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress
                  value={page?.relevanceScore ? page.relevanceScore * 100 : 0}
                  className="h-2 w-16"
                />
                {(page?.relevanceScore ? page.relevanceScore * 100 : 0).toFixed(
                  0
                )}
                %
              </div>
            </TableCell>
            <TableCell className="text-sm text-gray-500">
              {format(new Date(page?.lastModified ?? ""), "MMM d, yyyy")}
            </TableCell>
            <TableCell>{getStatusBadge(page?.status)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onApprove(page.id)}
                        disabled={
                          page.status === "approved" || loadingPages[page.id]
                        }
                      >
                        {loadingPages[page.id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ThumbsUp className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Approve content</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onReject(page.id)}
                        disabled={
                          page.status === "rejected" || loadingPages[page.id]
                        }
                      >
                        {loadingPages[page.id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ThumbsDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reject content</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPreview(page)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Preview content</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
