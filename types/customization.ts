import { z } from "zod";

export const customizationSchema = z.object({
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

export type CustomizationForm = z.infer<typeof customizationSchema>;
