import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { samplePages } from "@/lib/sample-data";

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

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid page ID" });
  }

  try {
    // For demo purposes, find the page in sample data
    const page = samplePages.find((p) => p.id === id);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    // Update page status
    const updatedPage = {
      ...page,
      status: "approved",
    };

    return res.status(200).json(updatedPage);
  } catch (error) {
    console.error("Error approving page:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
