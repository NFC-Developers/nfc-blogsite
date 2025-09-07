import prisma from "@/lib/prisma";

export async function GET(req, context) {
  // Next may provide params as a promise-like value; await the context before using it.
  const { params } = await context;
  const userId = params?.userId;

  try {
    const posts = await prisma.post.findMany({
      where: { author: { firebaseUid: userId } },
      include: { author: true, tags: true, comments: true },
      orderBy: { createdAt: "desc" },
    });

    // Return an empty array for no posts (client expects an array).
    return new Response(JSON.stringify(posts || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
