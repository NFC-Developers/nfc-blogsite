import prisma from "@/lib/prisma";
import { requireAuth } from "@/middlewares/auth";


export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const posts = await prisma.post.findMany({
      where: userId
        ? { author: { firebaseUid: userId } }
        : {}, 
      include: { author: true, tags: true, comments: true },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new Response(
      JSON.stringify({ error: "Could not fetch posts", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, content, tags, rating, isExplicit } = body;

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const userAuth = await requireAuth(req);
    if (!userAuth) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    let user = await prisma.user.findUnique({
      where: { firebaseUid: userAuth.uid },
      select: { id: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: userAuth.uid,
          email: userAuth.email || `${userAuth.uid}@placeholder.local`,
        },
      });
    }

    const tagsData = [];
    for (const t of tags || []) {
      const category = await prisma.tagCategory.upsert({
        where: { name: t.categoryName },
        update: {},
        create: { name: t.categoryName },
      });

      tagsData.push({
        where: {
          name_categoryId: {
            name: t.name,
            categoryId: category.id,
          },
        },
        create: {
          name: t.name,
          categoryId: category.id,
        },
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        description: description || "",
        content,
        rating,
        isExplicit,
        author: { connect: { id: user.id } },
        tags: { connectOrCreate: tagsData },
      },
      include: { author: true, tags: true },
    });

    return new Response(JSON.stringify(post), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error creating post:", err);
    return new Response(
      JSON.stringify({ error: "Could not create post", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
