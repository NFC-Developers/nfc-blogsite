import admin from "firebase-admin";

// Safely initialize Firebase Admin SDK only when the service account key is present.
// This prevents server crashes during local development when the env var isn't set.
const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!admin.apps.length) {
  if (key) {
    try {
      const serviceAccount = JSON.parse(key);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("Firebase Admin initialized.");
    } catch (err) {
      console.error(
        "Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY — Firebase Admin NOT initialized.",
        err
      );
    }
  } else {
    console.warn(
      "FIREBASE_SERVICE_ACCOUNT_KEY not set. Firebase Admin SDK will not be initialized. " +
        "API routes that require admin (server-side auth) may return 401/500. " +
        "For local development set this env var or mock auth."
    );
  }
}

export default admin;
