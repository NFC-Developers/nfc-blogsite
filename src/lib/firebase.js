// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// import { getStorage, connectStorageEmulator } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoicOy_2TK9a97-giuQ_EN10IRf6avexA",
  authDomain: "nfc-blogsite.firebaseapp.com",
  projectId: "nfc-blogsite",
  storageBucket: "nfc-blogsite.firebasestorage.app",
  messagingSenderId: "597777522695",
  appId: "1:597777522695:web:4fcb90bc6f3ecfb79a4aa2",
  measurementId: "G-92VMWWZCWY",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Emulator connection
if (process.env.NEXT_PUBLIC_USE_EMULATOR === "true") {
  connectFirestoreEmulator(db, "firestore", 9090);
  connectAuthEmulator(auth, "http://auth:9099");
  connectStorageEmulator(storage, "host.docker.internal", 9199);
}
