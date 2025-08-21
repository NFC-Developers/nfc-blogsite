// src/app/api/user/posts/route.js
import prisma from "@/lib/prisma";
import { requireAuth } from "@/middlewares/auth";

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

    // 🛡️ Auth
    const userAuth = await requireAuth(req);
    if (!userAuth) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1️⃣ Ensure user exists
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

    // 2️⃣ Handle tags + categories
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

    // 3️⃣ Create post
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
