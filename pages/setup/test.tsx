import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { IntegrationCard } from "@/components/integration/IntegrationCard";
import { VerificationDialog } from "@/components/integration/VerificationDialog";
import { PageHeader } from "@/components/integration/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

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
    <MainLayout showProgress currentStep={5} totalSteps={5}>
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
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="animate-pulse bg-white/50 backdrop-blur-sm border-primary/20"
              >
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                Step 5: Integration
              </Badge>
              <PageHeader
                title="Integrate Your Chatbot"
                description="Add the chatbot to your website in just a few steps"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-2xl mx-auto"
            >
              <IntegrationCard
                organizationId={process.env.NEXT_PUBLIC_ORG_ID ?? ""}
                onVerifyClick={verifyIntegration}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <VerificationDialog
        open={verificationOpen}
        onOpenChange={setVerificationOpen}
        results={testResults}
      />
    </MainLayout>
  );
};

export default TestPage;
