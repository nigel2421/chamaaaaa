import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore (with databaseId from config if provided)
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== "(default)"
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Test connection
export async function testFirebaseConnection() {
  try {
    await getDocFromServer(doc(db, "health", "ping"));
    console.log("Firebase Firestore connected successfully to project: benaa-multipurpose");
    return true;
  } catch (error) {
    console.warn("Firebase test connection ping:", error);
    return false;
  }
}
