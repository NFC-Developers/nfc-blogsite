import prisma from '@/lib/prisma.js';

export async function GET(req, { params }) {
  const { userId } = params;

  try {
    const posts = await prisma.post.findMany({
      where: { author: { firebaseUid: userId } },
      include: { author: true, tags: true, comments: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!posts || posts.length === 0) {
      return new Response(JSON.stringify({ error: 'No posts found for this user' }), { status: 404 });
    }

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error('Error fetching user posts:', err);
    return new Response(JSON.stringify({ error: 'Could not fetch user posts' }), { status: 500 });
  }
}
