import prisma from "@/lib/prisma.js";

export async function GET(req, context) {
  const { userId } = await context.params;

  try {
    const posts = await prisma.post.findMany({
      where: { author: { firebaseUid: userId } },
      include: { author: true, tags: true, comments: true },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return new Response(
      JSON.stringify({ error: "Could not fetch user posts" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
