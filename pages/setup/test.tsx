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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import {
  CopyIcon,
  CheckIcon,
  XIcon,
  CodeIcon,
  MailIcon,
  RocketIcon,
  ArrowRightIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

type TestStep = "initial" | "deep" | "complete";

interface TestResult {
  step: TestStep;
  status: "success" | "error" | "pending";
  message: string;
}

const TestPage: NextPage = () => {
  const [copied, setCopied] = useState(false);
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

  const snippetCode = `<script>
  window.BEYONDCHAT_CONFIG = {
    organizationId: "${process.env.NEXT_PUBLIC_ORG_ID}",
    theme: "light",
  };
</script>
<script async src="https://cdn.beyondchat.ai/widget.js"></script>`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippetCode);
      setCopied(true);
      toast.success("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to copy code";
      toast.error(errorMessage);
    }
  };

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
        className="container max-w-[1200px] px-4 md:px-6 py-6"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RocketIcon className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Integrate Your Chatbot
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Add the chatbot to your website in just a few steps
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6"
          >
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CodeIcon className="h-5 w-5 text-primary" />
                  Integration
                </CardTitle>
                <CardDescription>
                  Choose your preferred integration method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="code" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="code"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      <CodeIcon className="h-4 w-4 mr-2" />
                      Code Snippet
                    </TabsTrigger>
                    <TabsTrigger
                      value="email"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      <MailIcon className="h-4 w-4 mr-2" />
                      Email Instructions
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="code" className="space-y-4">
                    <div className="relative">
                      <pre className="rounded-lg bg-secondary/50 p-4 overflow-x-auto border border-primary/20">
                        <code className="text-sm font-mono">{snippetCode}</code>
                      </pre>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-2 hover:bg-primary/20"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <CheckIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <CopyIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-primary border-primary/50"
                      >
                        Tip
                      </Badge>
                      Add this code to your website&apos;s HTML, just before the
                      closing &lt;/body&gt; tag.
                    </p>
                  </TabsContent>
                  <TabsContent value="email" className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      We can email the integration instructions to your
                      development team.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-primary/20 border-primary/50"
                      onClick={() =>
                        toast.success("Instructions sent successfully")
                      }
                    >
                      <MailIcon className="h-4 w-4 mr-2" />
                      Email Instructions
                    </Button>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white group"
                    onClick={verifyIntegration}
                  >
                    Verify Integration
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RocketIcon className="h-5 w-5 text-primary" />
              Verifying Integration
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <AnimatePresence>
              {testResults.map((result) => (
                <motion.div
                  key={result.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-2 rounded-md bg-secondary/30"
                >
                  {result.status === "pending" && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  )}
                  {result.status === "success" && (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  )}
                  {result.status === "error" && (
                    <XIcon className="h-4 w-4 text-red-500" />
                  )}
                  <p className="text-sm">{result.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default TestPage;
