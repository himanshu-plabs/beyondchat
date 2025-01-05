import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Search, ThumbsDown, ThumbsUp } from "lucide-react";
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

interface Page {
  id: string;
  url: string;
  content: string;
  relevanceScore: number;
  status: "pending" | "approved" | "rejected";
}

const TrainingSetup: NextPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [loadingPages, setLoadingPages] = useState<Record<string, boolean>>({});

  const { data: pages = [], refetch } = useQuery<Page[]>({
    queryKey: ["pages"],
    queryFn: async () => {
      const response = await fetch("/api/pages");
      if (!response.ok) throw new Error("Failed to fetch pages");
      return response.json();
    },
  });

  const filteredPages = pages.filter((page) =>
    page.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = async (pageId: string) => {
    try {
      setLoadingPages((prev) => ({ ...prev, [pageId]: true }));
      const response = await fetch(`/api/pages/${pageId}/approve`, {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to approve page");
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

  const getStatusBadge = (status: Page["status"]) => {
    const variants: Record<
      Page["status"],
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
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Content Review & Training
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Review and approve content for AI training. Higher quality content
              leads to better responses.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                onClick={startTraining}
                disabled={isTraining || pages.length === 0}
              >
                {isTraining ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Training ({trainingProgress}%)
                  </>
                ) : (
                  "Start Training"
                )}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Content Review</CardTitle>
                <CardDescription>
                  Review and approve content for your AI knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">URL</TableHead>
                        <TableHead>Content Preview</TableHead>
                        <TableHead className="w-[100px]">Relevance</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPages.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-mono text-sm truncate">
                            {page?.url}
                          </TableCell>
                          <TableCell className="max-w-[400px]">
                            <p className="truncate">{page.content}</p>
                          </TableCell>
                          <TableCell>
                            {page?.relevanceScore?.toFixed(2)}
                          </TableCell>
                          <TableCell>{getStatusBadge(page.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleApprove(page.id)}
                                disabled={
                                  page?.status === "approved" ||
                                  loadingPages[page.id]
                                }
                              >
                                {loadingPages[page.id] ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <ThumbsUp className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleReject(page.id)}
                                disabled={
                                  page?.status === "rejected" ||
                                  loadingPages[page.id]
                                }
                              >
                                {loadingPages[page.id] ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <ThumbsDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
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
                  <div className="space-y-2">
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${trainingProgress}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      {trainingProgress < 30 && "Preparing training data..."}
                      {trainingProgress >= 30 &&
                        trainingProgress < 60 &&
                        "Training model..."}
                      {trainingProgress >= 60 &&
                        trainingProgress < 90 &&
                        "Fine-tuning responses..."}
                      {trainingProgress >= 90 && "Finalizing training..."}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainingSetup;
