import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const userId = params.userId; 

  try {
    const posts = await prisma.post.findMany({
      where: { author: { firebaseUid: userId } },
      include: { author: true, tags: true, comments: true },
      orderBy: { createdAt: "desc" },
    });

    if (!posts.length) {
      return new Response(JSON.stringify({ error: "No posts found" }), { status: 404 });
    }

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
