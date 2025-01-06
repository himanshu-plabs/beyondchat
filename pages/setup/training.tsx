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
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useState } from "react";
import { FileText, Loader2, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { sampleTrainingPages, type TrainingPage } from "@/lib/sample-data";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StatsCard } from "@/components/training/StatsCard";
import { ContentTable } from "@/components/training/ContentTable";
import { ContentPreview } from "@/components/training/ContentPreview";
import { TrainingProgress } from "@/components/training/TrainingProgress";
import { SearchFilter } from "@/components/training/SearchFilter";

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

      if (!response?.ok) {
        const error = await response?.json();
        throw new Error(error?.error || "Failed to reject page");
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

      if (!response?.ok) {
        const error = await response?.json();
        throw new Error(error?.error || "Failed to start training");
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
                    disabled={isTraining || stats.total === 0}
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
            <StatsCard
              title="Total Pages"
              value={stats.total}
              Icon={FileText}
            />
            <StatsCard
              title="Approved"
              value={stats.approved}
              color="text-green-600"
              showProgress
              total={stats.total}
            />
            <StatsCard
              title="Pending"
              value={stats.pending}
              color="text-yellow-600"
              showProgress
              total={stats.total}
            />
            <StatsCard
              title="Rejected"
              value={stats.rejected}
              color="text-red-600"
              showProgress
              total={stats.total}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Review</CardTitle>
              <CardDescription>
                Review and approve content for your AI knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SearchFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <div className="rounded-md border">
                <ContentTable
                  pages={filteredPages}
                  loadingPages={loadingPages}
                  onPreview={setPreviewContent}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
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
        </div>
      </div>

      <ContentPreview
        content={previewContent}
        onClose={() => setPreviewContent(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <TrainingProgress
        progress={trainingProgress}
        approvedPages={stats.approved}
        isOpen={isTraining}
      />
    </MainLayout>
  );
};

export default TrainingSetup;
