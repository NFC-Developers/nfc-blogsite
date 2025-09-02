import prisma from "@/lib/prisma";

let warnedMissingSchema = false;

export async function GET(req, context) {
  // Next may provide params as a promise-like value; await the context before using it.
  const { params } = await context;
  const userId = params?.userId;

  try {
    let posts;
    try {
      posts = await prisma.post.findMany({
        where: { author: { firebaseUid: userId } },
        include: { author: true, tags: true, comments: true },
        orderBy: { createdAt: "desc" },
      });
    } catch (prismaErr) {
      if (prismaErr?.code === "P2021") {
        if (!warnedMissingSchema) {
          console.warn(
            "Prisma schema/tables not found (P2021). Create the local DB with prisma db push or run migrations to remove this warning."
          );
          warnedMissingSchema = true;
        }

        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      console.error("Prisma error while fetching posts by user:", prismaErr);
      throw prismaErr;
    }

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
