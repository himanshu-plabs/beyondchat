import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useState } from "react";
import { Building } from "lucide-react";
import {
  OrganizationForm,
  type OrganizationForm as OrganizationFormType,
} from "@/components/organization/OrganizationForm";
import { ScanProgressDialog } from "@/components/organization/ScanProgressDialog";

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
      <div className="container max-w-[800px] px-4 md:px-6 py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tighter sm:text-4xl">
              <Building className="h-8 w-8 text-primary" />
              Organization Profile
            </h1>
            <p className="text-muted-foreground">
              Let&apos;s set up your organization profile and scan your website
              to build your AI knowledge base.
            </p>
          </div>

          <OrganizationForm onSubmit={onSubmit} isSubmitting={isScanning} />
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
