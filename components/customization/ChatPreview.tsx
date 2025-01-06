import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CustomizationForm } from "@/types/customization";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, ArrowLeft, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatPreviewProps {
  previewUrl: string;
  formValues: CustomizationForm;
}

export function ChatPreview({ previewUrl, formValues }: ChatPreviewProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const { position } = formValues.theme;
  const router = useRouter();

  useEffect(() => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-500 hover:bg-blue-600",
      red: "bg-rose-500 hover:bg-rose-600",
      green: "bg-emerald-500 hover:bg-emerald-600",
      purple: "bg-purple-500 hover:bg-purple-600",
      orange: "bg-orange-500 hover:bg-orange-600",
    };
    setButtonColor(colorMap[formValues.theme.primaryColor] || colorMap.blue);
  }, [formValues]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        text: inputValue,
        isBot: false,
        timestamp: new Date(),
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: formValues.behavior.fallbackMessage,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }, 1000);

    setInputValue("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full min-h-[70vh] md:aspect-video rounded-xl border bg-white/60 backdrop-blur-md shadow-xl"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {!previewUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center w-full max-w-sm mx-auto p-6"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10 w-fit mx-auto mb-4">
              <ArrowLeft className="h-6 w-6 text-primary" />
            </div>
            <p className="text-base text-muted-foreground mb-6">
              No website URL found. Please go back to the organization setup.
            </p>
            <Button
              variant="outline"
              onClick={() => router.push("/setup/organization")}
              className="w-full sm:w-auto bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 hover:bg-white/60"
            >
              Go to Organization Setup
            </Button>
          </motion.div>
        ) : (
          <div className="w-full h-full max-w-6xl mx-auto p-4">
            <Card className="h-full w-full overflow-hidden bg-white/80 backdrop-blur-md border-primary/10 shadow-lg">
              <div className="flex items-center gap-2 p-2 border-b border-primary/10">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-mono truncate">
                  {previewUrl}
                </span>
              </div>
              <iframe
                src={previewUrl}
                className="h-[calc(100%-40px)] w-full"
                sandbox="allow-same-origin allow-scripts"
              />
            </Card>
          </div>
        )}
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={cn(
            "absolute p-4",
            position === "bottom-right" && "bottom-0 right-0",
            position === "bottom-left" && "bottom-0 left-0",
            position === "top-right" && "top-0 right-0",
            position === "top-left" && "top-0 left-0"
          )}
        >
          <Button
            size="icon"
            className={cn(
              "h-12 w-12 rounded-full shadow-lg transition-transform hover:scale-110",
              buttonColor,
              "relative overflow-hidden"
            )}
            onClick={() => {
              setIsChatOpen(!isChatOpen);
              if (messages.length === 0) {
                setMessages([
                  {
                    text: formValues.behavior.welcomeMessage,
                    isBot: true,
                    timestamp: new Date(),
                  },
                ]);
              }
            }}
          >
            {isChatOpen ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                ×
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <MessageSquare className="h-5 w-5" />
              </motion.div>
            )}
          </Button>
        </motion.div>

        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={cn(
              "absolute w-[250px] h-[350px] xs:w-[300px] xs:h-[500px] sm:w-[400px] sm:h-[600px] bg-white rounded-xl shadow-xl border border-primary/10 m-2 md:m-4 overflow-hidden",
              position === "bottom-right" && "bottom-16 right-0 md:right-4",
              position === "bottom-left" && "bottom-16 left-0 md:left-4",
              position === "top-right" && "top-16 right-0 md:right-4",
              position === "top-left" && "top-16 left-0 md:left-4"
            )}
          >
            <div className="flex flex-col h-full">
              <div
                className={cn(
                  "p-4 rounded-t-xl text-white shadow-lg",
                  buttonColor
                )}
              >
                <h3 className="font-semibold">Chat with us</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "p-3 max-w-[80%] rounded-xl shadow-sm",
                          msg.isBot
                            ? "bg-gray-100/80 backdrop-blur-sm"
                            : cn(buttonColor, "ml-auto text-white shadow-lg")
                        )}
                      >
                        {msg.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <div className="p-4 border-t border-primary/10 bg-white/80 backdrop-blur-sm">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    className="flex-1 bg-white/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button
                    onClick={handleSend}
                    className={cn(buttonColor, "shadow-lg px-3")}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
