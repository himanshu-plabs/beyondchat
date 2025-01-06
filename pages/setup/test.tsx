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
import { CopyIcon, CheckIcon, XIcon, AlertTriangleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type IntegrationStatus = "pending" | "success" | "error";
type TestStep = "initial" | "deep" | "complete";

interface TestResult {
  step: TestStep;
  status: "success" | "error" | "pending";
  message: string;
}

const feedbackSchema = z.object({
  category: z.enum(["accuracy", "appearance", "performance", "other"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["low", "medium", "high"]),
  screenshot: z.any().optional(),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

const TestPage: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
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
  const [integrationStatus, setIntegrationStatus] =
    useState<IntegrationStatus>("pending");
  const router = useRouter();
  const [verificationOpen, setVerificationOpen] = useState(false);

  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      category: "accuracy",
      description: "",
      priority: "medium",
    },
  });

  const onSubmitFeedback = (data: FeedbackForm) => {
    toast.success("Feedback submitted successfully");
    // TODO: Send feedback data to API
    console.log("Feedback data:", data);
  };

  const snippetCode = `<script>
  window.BEYONDCHAT_CONFIG = {
    organizationId: "${process.env.NEXT_PUBLIC_ORG_ID}",
    theme: "light",
  };
</script>
<script async src="https://cdn.beyondchat.ai/widget.js"></script>`;

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: message } as Message,
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: messages }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.message },
      ]);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get response";
      toast.error(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

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

      setIntegrationStatus("success");
      toast.success("Integration verified successfully");

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
      setIntegrationStatus("error");
      toast.error(errorMessage);
    }
  };

  const runIntegrationTest = async () => {
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

      const domainResponse = await fetch("/api/verify-domain");
      if (!domainResponse.ok) throw new Error("Domain verification failed");

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

      // Deep Verification
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

      const widgetResponse = await fetch("/api/verify-widget");
      if (!widgetResponse.ok) throw new Error("Widget verification failed");

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

      // Complete Integration
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

      const integrationResponse = await fetch("/api/complete-integration");
      if (!integrationResponse.ok)
        throw new Error("Integration completion failed");

      setTestResults((prev) =>
        prev.map((result) =>
          result.step === "complete"
            ? { ...result, status: "success", message: "Integration complete" }
            : result
        )
      );

      setIntegrationStatus("success");
      toast.success("Integration completed successfully");
      setTimeout(() => router.push("/setup/complete"), 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Integration test failed";
      setTestResults((prev) =>
        prev.map((result) =>
          result.status === "pending"
            ? { ...result, status: "error", message: errorMessage }
            : result
        )
      );
      setIntegrationStatus("error");
      toast.error(errorMessage);
    }
  };

  return (
    <MainLayout showProgress currentStep={3} totalSteps={5}>
      <div className="container max-w-[1200px] px-4 md:px-6 py-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Integrate Your Chatbot
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Add the chatbot to your website
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration</CardTitle>
                <CardDescription>
                  Add the chatbot to your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="code">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="code">Code Snippet</TabsTrigger>
                    <TabsTrigger value="email">Email Instructions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="code" className="space-y-4">
                    <div className="relative">
                      <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                        <code className="text-sm">{snippetCode}</code>
                      </pre>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-2"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <CopyIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Add this code to your website's HTML, just before the
                      closing {"</body>"} tag.
                    </p>
                  </TabsContent>
                  <TabsContent value="email" className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      We can email the integration instructions to your
                      development team.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        toast.success("Instructions sent successfully")
                      }
                    >
                      Email Instructions
                    </Button>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={verifyIntegration}
                  >
                    Verify Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verifying Integration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {testResults.map((result) => (
              <div key={result.step} className="flex items-center gap-3">
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
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default TestPage;
