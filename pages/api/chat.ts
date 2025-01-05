import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string(),
  history: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
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
    const { message, history } = chatSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { organization: true },
    });

    if (!user?.organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    // For demo purposes, we'll return a simple response
    // In a real application, this would use an AI model
    const responses = [
      "I understand your question. Let me help you with that.",
      "Based on the information available, here's what I can tell you.",
      "That's a great question! Here's what you need to know.",
      "I'd be happy to assist you with that inquiry.",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    return res.status(200).json({
      message: randomResponse,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
