import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { samplePages, sampleTrainingResults } from "@/lib/sample-data";

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
    // For demo purposes, get approved pages from sample data
    const approvedPages = samplePages.filter(
      (page) => page.status === "approved"
    );

    if (approvedPages.length === 0) {
      return res.status(400).json({
        error:
          "No approved pages found. Please approve some pages for training.",
      });
    }

    // Simulate training delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return res.status(200).json({
      message: "Training completed successfully",
      pagesProcessed: approvedPages.length,
      ...sampleTrainingResults,
    });
  } catch (error) {
    console.error("Error starting training:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
