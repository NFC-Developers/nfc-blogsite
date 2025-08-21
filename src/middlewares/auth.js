import admin from "@/lib/firebaseAdmin";

export async function requireAuth(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);


    return decoded;
  } catch (err) {
    console.error("Auth error:", err);
    return null;
  }
}
