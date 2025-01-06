import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { z } from "zod";

const organizationSchema = z.object({
  name: z.string().min(2).max(50),
  website: z.string().url(),
  description: z.string().min(10).max(500).optional(),
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
    const { name, website, description } = organizationSchema.parse(req.body);

    // Add 5 second delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const organization = await prisma.organization.create({
      data: {
        name,
        website,
        description,
        users: {
          connect: { id: session.user.id },
        },
      },
    });

    // Common pages to scan
    const pagePaths = [
      "", // index
      "about",
      "terms",
      "contact",
      "privacy",
    ];

    const pages = pagePaths.map((path) => ({
      url: `${website}${path ? `/${path}` : ""}`,
      status: "pending",
      content: "", // Empty content to be filled by actual scraping
      organizationId: organization.id,
    }));

    await prisma.page.createMany({
      data: pages,
    });

    return res.status(200).json({
      organization,
      pagesFound: pages.length,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Organization scan error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
