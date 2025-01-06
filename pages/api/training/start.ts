import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

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
    const approvedPages = await prisma.page.findMany({
      where: {
        organization: {
          users: {
            some: {
              id: session.user.id,
            },
          },
        },
      },
    });

    // if (approvedPages.length === 0) {
    //   return res.status(400).json({
    //     error:
    //       "No approved pages found. Please approve some pages for training.",
    //   });
    // }

    // Simulate training delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return res.status(200).json({
      message: "Training completed successfully",
      pagesProcessed: approvedPages.length,
      trainingResults: {
        accuracy: 0.95,
        loss: 0.02,
      },
    });
  } catch (error) {
    console.error("Error starting training:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
