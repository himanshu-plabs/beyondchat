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
import { motion, AnimatePresence } from "framer-motion";

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
      { variant: "default" | "secondary" | "destructive"; text: string }
    > = {
      pending: { variant: "secondary", text: "Pending" },
      approved: { variant: "default", text: "Approved" },
      rejected: { variant: "destructive", text: "Rejected" },
    };
    return (
      <Badge variant={variants[status].variant}>{variants[status].text}</Badge>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-md border border-primary/10">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5 hover:bg-primary/5">
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
          <AnimatePresence initial={false}>
            {pages.map((page) => (
              <motion.tr
                key={page.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="group hover:bg-primary/5"
              >
                <TableCell className="font-mono text-sm truncate">
                  <Button
                    variant="link"
                    className="p-0 h-auto font-mono text-primary hover:text-primary/80"
                    onClick={() => onPreview(page)}
                  >
                    {page?.url}
                  </Button>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-purple-500/90 backdrop-blur-sm border-primary/10 text-white"
                  >
                    {page?.category}
                  </Badge>
                </TableCell>
                <TableCell>{page?.wordCount?.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        page?.relevanceScore ? page.relevanceScore * 100 : 0
                      }
                      className="h-1.5 w-16 bg-primary/10"
                      indicatorClassName="bg-gradient-to-r from-primary to-purple-600"
                    />
                    <span className="text-sm text-muted-foreground">
                      {(page?.relevanceScore
                        ? page.relevanceScore * 100
                        : 0
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(page?.lastModified ?? ""), "MMM d, yyyy")}
                </TableCell>
                <TableCell>{getStatusBadge(page?.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onApprove(page.id)}
                            disabled={
                              page.status === "approved" ||
                              loadingPages[page.id]
                            }
                            className="h-8 w-8 hover:bg-emerald-500/10 hover:text-emerald-500"
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
                              page.status === "rejected" ||
                              loadingPages[page.id]
                            }
                            className="h-8 w-8 hover:bg-rose-500/10 hover:text-rose-500"
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
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Preview content</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}
