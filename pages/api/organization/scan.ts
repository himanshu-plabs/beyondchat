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

    // Start the website scanning process
    // This would typically be handled by a background job
    // For demo purposes, we'll create some sample pages
    const samplePages = [
      { url: website, status: "completed" },
      { url: `${website}/about`, status: "completed" },
      { url: `${website}/contact`, status: "completed" },
    ];

    await prisma.page.createMany({
      data: samplePages.map((page) => ({
        ...page,
        content: "Sample content",
        organizationId: organization.id,
      })),
    });

    return res.status(200).json(organization);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Organization scan error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
