import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useState } from "react";
import {
  Loader2,
  Search,
  ThumbsDown,
  ThumbsUp,
  FileText,
  RefreshCw,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { sampleTrainingPages, type TrainingPage } from "@/lib/sample-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TrainingSetup: NextPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [loadingPages, setLoadingPages] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewContent, setPreviewContent] = useState<TrainingPage | null>(
    null
  );

  const { data: pages = [], refetch } = useQuery<TrainingPage[]>({
    queryKey: ["pages"],
    queryFn: async () => {
      // In production, fetch from API
      return [...sampleTrainingPages];
    },
  });

  const filteredPages =
    pages?.filter((page: TrainingPage) => {
      const matchesSearch = page?.url
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase() ?? "");
      const matchesCategory =
        selectedCategory === "all" || page?.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }) ?? [];

  const stats = {
    total: pages?.length ?? 0,
    approved:
      pages?.filter((p: TrainingPage) => p?.status === "approved")?.length ?? 0,
    pending:
      pages?.filter((p: TrainingPage) => p?.status === "pending")?.length ?? 0,
    rejected:
      pages?.filter((p: TrainingPage) => p?.status === "rejected")?.length ?? 0,
  };

  const handleApprove = async (pageId: string) => {
    try {
      setLoadingPages((prev) => ({ ...prev, [pageId]: true }));
      const response = await fetch(`/api/pages/${pageId}/approve`, {
        method: "POST",
      });

      if (!response?.ok) {
        const error = await response?.json();
        throw new Error(error?.error || "Failed to approve page");
      }

      await refetch();
      toast.success("Page approved for training");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to approve page");
      }
    } finally {
      setLoadingPages((prev) => ({ ...prev, [pageId]: false }));
    }
  };

  const handleReject = async (pageId: string) => {
    try {
      setLoadingPages((prev) => ({ ...prev, [pageId]: true }));
      const response = await fetch(`/api/pages/${pageId}/reject`, {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to reject page");
      }

      await refetch();
      toast.success("Page rejected from training");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to reject page");
      }
    } finally {
      setLoadingPages((prev) => ({ ...prev, [pageId]: false }));
    }
  };

  const startTraining = async () => {
    try {
      setIsTraining(true);

      // Simulate training progress
      const interval = setInterval(() => {
        setTrainingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 1000);

      const response = await fetch("/api/training/start", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to start training");
      }

      await response.json();
      clearInterval(interval);
      setTrainingProgress(100);

      toast.success("Training completed successfully");
      await router.push("/setup/customization");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to start training");
      }
      setIsTraining(false);
      setTrainingProgress(0);
    }
  };

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
    <MainLayout showProgress currentStep={3} totalSteps={5}>
      <div className="container max-w-[1200px] px-4 md:px-6 py-12">
        <div className="space-y-8">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Content Review & Training
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Review and approve content for AI training. Higher quality
                content leads to better responses.
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={startTraining}
                    size="lg"
                    disabled={isTraining || pages?.length === 0}
                  >
                    {isTraining ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Training ({trainingProgress}%)
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Start Training
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Start training the AI with approved content
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <FileText className="text-gray-400 h-4 w-4" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </div>
                <Progress
                  value={(stats.approved / stats.total) * 100}
                  className="h-2"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </div>
                <Progress
                  value={(stats.pending / stats.total) * 100}
                  className="h-2"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </div>
                <Progress
                  value={(stats.rejected / stats.total) * 100}
                  className="h-2"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Review</CardTitle>
              <CardDescription>
                Review and approve content for your AI knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
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
                    {filteredPages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell className="font-mono text-sm truncate">
                          <Button
                            variant="link"
                            className="p-0 h-auto font-mono"
                            onClick={() => setPreviewContent(page)}
                          >
                            {page?.url}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{page?.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {page?.wordCount?.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={
                                page?.relevanceScore
                                  ? page.relevanceScore * 100
                                  : 0
                              }
                              className="h-2 w-16"
                            />
                            {(page?.relevanceScore
                              ? page.relevanceScore * 100
                              : 0
                            ).toFixed(0)}
                            %
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {/* {format(
                            new Date(page?.lastModified ?? ""),
                            "MMM d, yyyy"
                          )} */}
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
                                    onClick={() => handleApprove(page.id)}
                                    disabled={
                                      page.status === "approved" ||
                                      loadingPages[page.id]
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
                                    onClick={() => handleReject(page.id)}
                                    disabled={
                                      page.status === "rejected" ||
                                      loadingPages[page.id]
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
                                    onClick={() => setPreviewContent(page)}
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
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-gray-500">
              <div>
                Showing {filteredPages?.length ?? 0} of {pages?.length ?? 0}{" "}
                pages
              </div>
              <div>Last updated: {format(new Date(), "MMM d, yyyy HH:mm")}</div>
            </CardFooter>
          </Card>

          {isTraining && (
            <Card>
              <CardHeader>
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>
                  Building your AI knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={trainingProgress} className="h-2" />
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Phase</div>
                      <div className="text-sm text-gray-500">
                        {trainingProgress < 30 && "Data Preparation"}
                        {trainingProgress >= 30 &&
                          trainingProgress < 60 &&
                          "Model Training"}
                        {trainingProgress >= 60 &&
                          trainingProgress < 90 &&
                          "Fine-tuning"}
                        {trainingProgress >= 90 && "Finalizing"}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Progress</div>
                      <div className="text-sm text-gray-500">
                        {trainingProgress}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Pages Processed</div>
                      <div className="text-sm text-gray-500">
                        {Math.floor((stats.approved * trainingProgress) / 100)}{" "}
                        / {stats.approved}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Estimated Time</div>
                      <div className="text-sm text-gray-500">
                        {Math.ceil((100 - trainingProgress) / 10)} minutes
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog
        open={!!previewContent}
        onOpenChange={() => setPreviewContent(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Content Preview</DialogTitle>
            <DialogDescription>
              Review the content before approving or rejecting
            </DialogDescription>
          </DialogHeader>
          {previewContent && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">URL</div>
                <div className="font-mono text-sm">{previewContent?.url}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Content</div>
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <div className="text-sm">{previewContent?.content}</div>
                </ScrollArea>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium">Category</div>
                  <div className="text-sm text-gray-500">
                    {previewContent?.category}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Word Count</div>
                  <div className="text-sm text-gray-500">
                    {previewContent?.wordCount}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Relevance Score</div>
                  <div className="text-sm text-gray-500">
                    {(previewContent?.relevanceScore
                      ? previewContent.relevanceScore * 100
                      : 0
                    ).toFixed(0)}
                    %
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPreviewContent(null)}
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleReject(previewContent.id);
                    setPreviewContent(null);
                  }}
                  disabled={previewContent.status === "rejected"}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    handleApprove(previewContent.id);
                    setPreviewContent(null);
                  }}
                  disabled={previewContent.status === "approved"}
                >
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default TrainingSetup;
