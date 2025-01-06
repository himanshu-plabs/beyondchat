import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useState } from "react";
import { Building, Sparkles } from "lucide-react";
import {
  OrganizationForm,
  type OrganizationForm as OrganizationFormType,
} from "@/components/organization/OrganizationForm";
import { ScanProgressDialog } from "@/components/organization/ScanProgressDialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const OrganizationSetup: NextPage = () => {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanError, setScanError] = useState<string>();

  const onSubmit = async (data: OrganizationFormType) => {
    try {
      setIsScanning(true);
      setScanError(undefined);

      // Store website URL in localStorage
      localStorage.setItem("previewUrl", data.website);

      // Simulate progress
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // Call the API to scan the website
      const response = await fetch("/api/organization/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to scan website");
      }

      const result = await response.json();
      clearInterval(interval);
      setScanProgress(100);

      toast.success(`Found ${result.pagesFound} pages to analyze`);
      await router.push("/setup/training");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to scan website";
      setScanError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <MainLayout showProgress currentStep={2} totalSteps={5}>
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

        <div className="container relative max-w-[800px] px-4 md:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="animate-pulse bg-white/50 backdrop-blur-sm border-primary/20"
              >
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                Step 2: Organization Setup
              </Badge>
              <div className="space-y-2">
                <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tighter sm:text-4xl">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                    Organization Profile
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Let&apos;s set up your organization profile and scan your
                  website to build your AI knowledge base.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <OrganizationForm onSubmit={onSubmit} isSubmitting={isScanning} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ScanProgressDialog
        isOpen={isScanning}
        progress={scanProgress}
        error={scanError}
      />
    </MainLayout>
  );
};

export default OrganizationSetup;
