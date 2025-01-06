import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Copy,
  Check,
  Code2,
  Mail,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white/80 backdrop-blur-xl border-primary/10">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Integration
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose your preferred integration method
            </p>
          </div>

          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 rounded-lg p-1 bg-white/50 backdrop-blur-sm border border-primary/10">
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/90 data-[state=active]:to-primary data-[state=active]:text-primary-foreground rounded-md transition-all data-[state=active]:shadow-lg"
              >
                <Code2 className="w-4 h-4 mr-2" />
                Code Snippet
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/90 data-[state=active]:to-primary data-[state=active]:text-primary-foreground rounded-md transition-all data-[state=active]:shadow-lg"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Instructions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="mt-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 rounded-lg -m-1" />
                <pre className="relative rounded-lg bg-white/60 backdrop-blur-sm p-4 overflow-x-auto border border-primary/10 font-mono text-sm">
                  <code>{snippetCode}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="absolute right-2 top-2 h-8 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-1.5"
                        >
                          <Check className="h-4 w-4" />
                          Copied!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-1.5"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </pre>
              </motion.div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <Badge
                  variant="outline"
                  className="bg-white/50 backdrop-blur-sm border-primary/20"
                >
                  <Sparkles className="w-3 h-3 mr-1 text-primary" />
                  Tip
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Add this code to your website&apos;s HTML, just before the
                  closing &lt;/body&gt; tag.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="email" className="mt-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground">
                  We can email the integration instructions to your development
                  team.
                </p>
                <Button
                  variant="outline"
                  className="w-full h-12 bg-white/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  onClick={() =>
                    toast.success("Instructions sent successfully")
                  }
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Instructions
                </Button>
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <Button
              onClick={onVerifyClick}
              className="w-full h-12 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Verify Integration
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <a
              href="https://docs.beyond-chat.com/integration"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View Documentation
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
