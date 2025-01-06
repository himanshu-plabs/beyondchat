import { type NextPage } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AppearanceForm } from "@/components/customization/AppearanceForm";
import { BehaviorForm } from "@/components/customization/BehaviorForm";
import { ChatPreview } from "@/components/customization/ChatPreview";
import {
  customizationSchema,
  type CustomizationForm,
} from "@/types/customization";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 p-4 md:p-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Customize Your Chatbot
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Personalize the appearance and behavior of your AI assistant to
                match your brand.
              </p>
            </div>

            <ChatPreview
              previewUrl={previewUrl}
              formValues={form.getValues()}
            />
          </div>
        </div>

        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
              <div className="flex flex-col h-full">
                <ScrollArea className="flex-1 p-4 md:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AppearanceForm control={form.control} />
                    <BehaviorForm control={form.control} />
                  </div>
                </ScrollArea>

                <div className="p-4 md:p-6 border-t">
                  <Button type="submit" className="w-full" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      "Save & Continue"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomizationSetup;
