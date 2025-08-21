import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const story = await prisma.post.findUnique({
      where: { id: params.storyId }, // use storyId here
      include: { author: true, tags: true, comments: true },
    });

    if (!story) {
      return new Response(JSON.stringify({ error: "Story not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(story), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching story:", err);
    return new Response(JSON.stringify({ error: "Could not fetch story" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
