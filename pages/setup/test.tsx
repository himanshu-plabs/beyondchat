import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { IntegrationCard } from "@/components/integration/IntegrationCard";
import { VerificationDialog } from "@/components/integration/VerificationDialog";
import { PageHeader } from "@/components/integration/PageHeader";

interface TestResult {
  step: "initial" | "deep" | "complete";
  status: "success" | "error" | "pending";
  message: string;
}

const TestPage: NextPage = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      step: "initial",
      status: "pending",
      message: "Checking domain configuration...",
    },
    {
      step: "deep",
      status: "pending",
      message: "Verifying widget functionality...",
    },
    {
      step: "complete",
      status: "pending",
      message: "Finalizing integration...",
    },
  ]);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const router = useRouter();

  const verifyIntegration = async () => {
    setVerificationOpen(true);
    setTestResults((prev) =>
      prev.map((result) => ({ ...result, status: "pending" }))
    );

    try {
      // Initial Check
      setTestResults((prev) =>
        prev.map((result) =>
          result.step === "initial"
            ? {
                ...result,
                status: "pending",
                message: "Checking domain configuration...",
              }
            : result
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTestResults((prev) =>
        prev.map((result) =>
          result.step === "initial"
            ? {
                ...result,
                status: "success",
                message: "Domain configuration verified",
              }
            : result
        )
      );

      // Deep Check
      setTestResults((prev) =>
        prev.map((result) =>
          result.step === "deep"
            ? {
                ...result,
                status: "pending",
                message: "Testing widget functionality...",
              }
            : result
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTestResults((prev) =>
        prev.map((result) =>
          result.step === "deep"
            ? {
                ...result,
                status: "success",
                message: "Widget functionality verified",
              }
            : result
        )
      );

      // Final Check
      setTestResults((prev) =>
        prev.map((result) =>
          result.step === "complete"
            ? {
                ...result,
                status: "pending",
                message: "Finalizing integration...",
              }
            : result
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTestResults((prev) =>
        prev.map((result) =>
          result.step === "complete"
            ? { ...result, status: "success", message: "Integration complete!" }
            : result
        )
      );

      // Wait a bit to show success state
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setVerificationOpen(false);
      router.push("/setup/complete");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Verification failed";
      setTestResults((prev) =>
        prev.map((result) =>
          result.status === "pending"
            ? { ...result, status: "error", message: errorMessage }
            : result
        )
      );
    }
  };

  return (
    <MainLayout showProgress currentStep={3} totalSteps={5}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[calc(100vh-4rem)] w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
      >
        <div className="max-w-[1200px] mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          <PageHeader
            title="Integrate Your Chatbot"
            description="Add the chatbot to your website in just a few steps"
          />
          <div className="w-full max-w-2xl mx-auto">
            <IntegrationCard
              organizationId={process.env.NEXT_PUBLIC_ORG_ID ?? ""}
              onVerifyClick={verifyIntegration}
            />
          </div>
        </div>
      </motion.div>

      <VerificationDialog
        open={verificationOpen}
        onOpenChange={setVerificationOpen}
        results={testResults}
      />
    </MainLayout>
  );
};

export default TestPage;
