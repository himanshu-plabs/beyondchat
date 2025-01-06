import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  CopyIcon,
  CheckIcon,
  CodeIcon,
  MailIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";

interface IntegrationCardProps {
  organizationId: string;
  onVerifyClick: () => void;
}

export const IntegrationCard = ({
  organizationId,
  onVerifyClick,
}: IntegrationCardProps) => {
  const [copied, setCopied] = useState(false);

  const snippetCode = `<script>
  window.BEYONDCHAT_CONFIG = {
    organizationId: "${organizationId}",
    theme: "light",
  };
</script>
<script async src="https://cdn.beyondchat.com/widget.js"></script>`;

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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="grid gap-6"
    >
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <CodeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            Integration
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Choose your preferred integration method
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-4"
              >
                <CodeIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 shrink-0" />
                <span className="hidden sm:inline">Code</span> Snippet
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-4"
              >
                <MailIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 shrink-0" />
                <span className="hidden sm:inline">Email</span> Instructions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="space-y-4">
              <div className="relative">
                <pre className="rounded-lg bg-secondary/50 p-3 sm:p-4 overflow-x-auto border border-primary/20 text-xs sm:text-sm">
                  <code className="font-mono break-all sm:break-normal whitespace-pre-wrap sm:whitespace-pre">
                    {snippetCode}
                  </code>
                </pre>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8 hover:bg-primary/20"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  ) : (
                    <CopyIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/50 text-xs sm:text-sm shrink-0"
                >
                  Tip
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Add this code to your website&apos;s HTML, just before the
                  closing &lt;/body&gt; tag.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="email" className="space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                We can email the integration instructions to your development
                team.
              </p>
              <Button
                variant="outline"
                className="w-full hover:bg-primary/20 border-primary/50 h-8 sm:h-10 text-xs sm:text-sm"
                onClick={() => toast.success("Instructions sent successfully")}
              >
                <MailIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 shrink-0" />
                Email Instructions
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-4 sm:mt-6">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white group h-8 sm:h-10 text-xs sm:text-sm"
              onClick={onVerifyClick}
            >
              Verify Integration
              <ArrowRightIcon className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
