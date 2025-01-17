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
import { FileText, Loader2, RefreshCw, Sparkles, Brain } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
      }, 500);

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
      <div className="relative min-h-screen bg-dot-pattern">
        {/* Gradient backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-primary/10 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)]" />

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container relative max-w-[1200px] px-4 md:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="animate-pulse bg-white/50 backdrop-blur-sm border-primary/20"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Step 3: Content Review
                </Badge>
                <div className="space-y-2">
                  <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tighter sm:text-4xl">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                      Content Review & Training
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Review and approve content for AI training. Higher quality
                    content leads to better responses.
                  </p>
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={startTraining}
                      size="lg"
                      disabled={isTraining || stats.total === 0}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-primary/20"
                    >
                      {isTraining ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Training ({trainingProgress}%)
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-5 w-5" />
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <StatsCard
                title="Total Pages"
                value={stats.total}
                Icon={FileText}
              />
              <StatsCard
                title="Approved"
                value={stats.approved}
                color="text-emerald-600"
                showProgress
                total={stats.total}
              />
              <StatsCard
                title="Pending"
                value={stats.pending}
                color="text-amber-600"
                showProgress
                total={stats.total}
              />
              <StatsCard
                title="Rejected"
                value={stats.rejected}
                color="text-rose-600"
                showProgress
                total={stats.total}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/60 backdrop-blur-md border-primary/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Content Review
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
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

                  <div className="rounded-md border border-primary/10">
                    <ContentTable
                      pages={filteredPages}
                      loadingPages={loadingPages}
                      onPreview={setPreviewContent}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                  <div>
                    Showing {filteredPages?.length ?? 0} of {pages?.length ?? 0}{" "}
                    pages
                  </div>
                  <div>
                    Last updated: {format(new Date(), "MMM d, yyyy HH:mm")}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
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
