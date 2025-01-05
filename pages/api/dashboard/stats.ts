import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [totalUsers, totalPages, activePages] = await Promise.all([
      prisma.user.count(),
      prisma.page.count(),
      prisma.page.count({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
          status: "pending",
        },
      }),
    ]);

    return res.status(200).json({
      totalUsers,
      totalPages,
      activePages,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
