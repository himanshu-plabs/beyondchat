import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { Loader2, Sparkles, Palette } from "lucide-react";
import { AppearanceForm } from "@/components/customization/AppearanceForm";
import { BehaviorForm } from "@/components/customization/BehaviorForm";
import { ChatPreview } from "@/components/customization/ChatPreview";
import {
  customizationSchema,
  type CustomizationForm,
} from "@/types/customization";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const CustomizationSetup: NextPage = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const storedUrl = localStorage.getItem("previewUrl");
    if (storedUrl) {
      setPreviewUrl(storedUrl);
    }
  }, []);

  const form = useForm<CustomizationForm>({
    resolver: zodResolver(customizationSchema),
    defaultValues: {
      theme: {
        primaryColor: "blue",
        font: "system",
        position: "bottom-right",
      },
      behavior: {
        welcomeMessage: "👋 Hi there! How can I help you today?",
        tone: "professional",
        fallbackMessage:
          "I'm not sure I understand. Could you please rephrase that?",
        operatingHours: {
          enabled: false,
          start: "09:00",
          end: "17:00",
        },
      },
    },
  });

  const onSubmit = async (data: CustomizationForm) => {
    try {
      setIsSaving(true);

      const response = await fetch("/api/customization/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save customization");
      }

      await response.json();
      toast.success("Customization saved successfully");
      await router.push("/setup/test");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save customization";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout showProgress currentStep={4} totalSteps={5}>
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
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="animate-pulse bg-white/50 backdrop-blur-sm border-primary/20"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Step 4: Customization
                </Badge>
                <div className="space-y-2">
                  <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tighter sm:text-4xl">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
                      <Palette className="h-8 w-8 text-primary" />
                    </div>
                    <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                      Customize Your Chatbot
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Personalize the appearance and behavior of your AI assistant
                    to match your brand.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSaving}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-primary/20"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ChatPreview
                previewUrl={previewUrl}
                formValues={form.getValues()}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col h-full"
              >
                <ScrollArea className="flex-1 p-4 md:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AppearanceForm control={form.control} />
                    <BehaviorForm control={form.control} />
                  </div>
                </ScrollArea>
              </motion.div>
            </form>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomizationSetup;
