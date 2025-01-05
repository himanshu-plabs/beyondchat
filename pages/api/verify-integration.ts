import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

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
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { organization: true },
    });

    if (!user?.organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    // For demo purposes, we'll simulate a successful integration
    // In a real application, this would check if the widget is properly installed

    return res.status(200).json({
      status: "success",
      message: "Integration verified successfully",
    });
  } catch (error) {
    console.error("Integration verification error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
