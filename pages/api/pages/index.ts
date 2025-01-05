import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { samplePages } from "@/lib/sample-data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // For demo purposes, we'll return sample data
    return res.status(200).json(samplePages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
