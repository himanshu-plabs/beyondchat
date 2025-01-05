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
import { CopyIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const TestPage: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const snippetCode = `<script>
  window.BEYONDCHAT_CONFIG = {
    organizationId: '${process.env.NEXT_PUBLIC_ORG_ID}',
    theme: 'light',
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
    } catch (error) {
      toast.error("Failed to get response");
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
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  const verifyIntegration = async () => {
    try {
      const response = await fetch("/api/verify-integration");
      if (!response.ok) throw new Error("Integration verification failed");

      toast.success("Integration verified successfully");
      router.push("/setup/complete");
    } catch (error) {
      toast.error("Integration verification failed");
    }
  };

  return (
    <MainLayout showProgress currentStep={3} totalSteps={5}>
      <div className="container max-w-[1200px] px-4 md:px-6 py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Test Your Chatbot
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Try out your chatbot and set up the integration
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  Test your chatbot's responses in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 p-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                          message.role === "user"
                            ? "ml-auto bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {message.content}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-2 rounded-lg bg-muted px-3 py-2 text-sm w-16">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t p-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(inputValue);
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      />
                      <Button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                      >
                        Send
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
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
                      <TabsTrigger value="email">
                        Email Instructions
                      </TabsTrigger>
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

              <Button
                className="w-full"
                onClick={() => router.push("/setup/complete")}
              >
                Skip Integration
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TestPage;
