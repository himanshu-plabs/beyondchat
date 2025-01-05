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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const customizationSchema = z.object({
  theme: z.object({
    primaryColor: z.string().min(1, "Please select a primary color"),
    font: z.string().min(1, "Please select a font"),
    position: z.string().min(1, "Please select a widget position"),
  }),
  behavior: z.object({
    welcomeMessage: z.string().min(1, "Welcome message is required"),
    tone: z.string().min(1, "Please select a response tone"),
    fallbackMessage: z.string().min(1, "Fallback message is required"),
    operatingHours: z.object({
      enabled: z.boolean(),
      start: z.string().optional(),
      end: z.string().optional(),
    }),
  }),
});

type CustomizationForm = z.infer<typeof customizationSchema>;

const colors = [
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Purple", value: "purple" },
  { label: "Red", value: "red" },
  { label: "Orange", value: "orange" },
];

const fonts = [
  { label: "System Default", value: "system" },
  { label: "Inter", value: "inter" },
  { label: "Roboto", value: "roboto" },
  { label: "Open Sans", value: "open-sans" },
];

const positions = [
  { label: "Bottom Right", value: "bottom-right" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Top Right", value: "top-right" },
  { label: "Top Left", value: "top-left" },
];

const tones = [
  { label: "Professional", value: "professional" },
  { label: "Friendly", value: "friendly" },
  { label: "Technical", value: "technical" },
  { label: "Casual", value: "casual" },
];

const CustomizationSetup: NextPage = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

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
      await router.push("/setup/complete");
    } catch (error) {
      toast.error("Failed to save customization");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout showProgress currentStep={4} totalSteps={5}>
      <div className="container max-w-[800px] px-4 md:px-6 py-12">
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how your chatbot looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="theme.primaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Color</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {colors.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="theme.font"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Family</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fonts.map((font) => (
                              <SelectItem key={font.value} value={font.value}>
                                {font.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="theme.position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Widget Position</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem
                                key={position.value}
                                value={position.value}
                              >
                                {position.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Behavior</CardTitle>
                  <CardDescription>
                    Configure how your chatbot interacts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="behavior.welcomeMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Welcome Message</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a welcome message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="behavior.tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Response Tone</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tones.map((tone) => (
                              <SelectItem key={tone.value} value={tone.value}>
                                {tone.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="behavior.fallbackMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fallback Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a fallback message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="behavior.operatingHours.enabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Operating Hours</FormLabel>
                          <p className="text-sm text-gray-500">
                            Limit when your chatbot is available
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch("behavior.operatingHours.enabled") && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="behavior.operatingHours.start"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="behavior.operatingHours.end"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

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
            </form>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomizationSetup;
