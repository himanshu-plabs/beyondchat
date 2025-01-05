import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { sampleCustomizations } from "@/lib/sample-data";
import { z } from "zod";

const customizationSchema = z.object({
  theme: z.object({
    primaryColor: z.string().min(1),
    font: z.string().min(1),
    position: z.string().min(1),
  }),
  behavior: z.object({
    welcomeMessage: z.string().min(1),
    tone: z.string().min(1),
    fallbackMessage: z.string().min(1),
    operatingHours: z.object({
      enabled: z.boolean(),
      start: z.string().optional(),
      end: z.string().optional(),
    }),
  }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = customizationSchema.parse(req.body);

    // For demo purposes, merge with sample data
    const customization = {
      ...sampleCustomizations,
      theme: {
        ...sampleCustomizations.theme,
        ...data.theme,
      },
      behavior: {
        ...sampleCustomizations.behavior,
        ...data.behavior,
      },
    };

    return res.status(200).json(customization);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error saving customization:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
