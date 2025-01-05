import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { z } from "zod";

const responseSchema = z.object({
  id: z.string(),
  status: z.literal("rejected"),
  url: z.string(),
  content: z.string(),
  error: z.string().nullable(),
  organizationId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid page ID" });
    }

    // Find page in database
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        organization: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    // Verify user has access to this organization
    const hasAccess = page.organization.users.some(
      (user) => user.id === session.user.id
    );
    if (!hasAccess) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Update page status
    const updatedPage = await prisma.page.update({
      where: { id },
      data: { status: "rejected" },
    });

    // Validate response
    const validatedPage = responseSchema.parse(updatedPage);

    return res.status(200).json(validatedPage);
  } catch (error) {
    console.error("Error rejecting page:", error);
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Invalid page data structure", details: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
