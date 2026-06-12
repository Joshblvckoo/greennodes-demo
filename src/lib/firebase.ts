import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Use explicit dot-notation so Turbopack can inline strings at compile time
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 🛡️ Guard step: Only initialize if we have an API key or if we are running in the browser
const hasApiKey = typeof firebaseConfig.apiKey === 'string' && firebaseConfig.apiKey.length > 0;
const isClient = typeof window !== 'undefined';

// Clean diagnostic log to instantly notify you in the browser console if strings drop out
if (isClient && !hasApiKey) {
  console.error("❌ Critical: Firebase Key unresolved. Verify .env.local prefixes!");
}

// Prevent initializing during server-side static prerendering if keys aren't injected yet
const app = (getApps().length === 0 && (hasApiKey || isClient))
  ? initializeApp(firebaseConfig)
  : getApps().length > 0 
    ? getApp() 
    : null;

// Export guarded instances
export const auth = app && hasApiKey ? getAuth(app) : null;
export const db = app && hasApiKey ? getFirestore(app) : null;
export default app;
