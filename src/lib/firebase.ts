import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

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
const isClient = typeof window !== 'undefined';
const hasValidKey = typeof firebaseConfig.apiKey === 'string' && firebaseConfig.apiKey.length > 5;

// Clean diagnostic log to instantly notify you in the browser console if strings drop out
if (isClient && !hasValidKey && process.env.NODE_ENV !== 'development') {
  console.error("❌ Critical: Firebase Key unresolved. Verify .env.local prefixes!");
}

// Prevent initializing during server-side static prerendering if keys aren't injected yet
const app = isClient && getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps().length > 0 
    ? getApp() 
    : null;

// Export guarded instances
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

// 🔌 THE CONNECTIVITY BRIDGE
// Auto-detects if the app is running on your local workstation preview vs live production
if (isClient && app) {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1');
  const isCloudWorkstation = window.location.hostname.includes('cloudworkstations.dev');

  if ((isLocalhost || isCloudWorkstation) && process.env.NODE_ENV === 'development') {
    console.log("🔌 Active Workspace Detected: Routing authentication to Firebase Studio Emulator...");
    
    if (auth) connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    if (db) connectFirestoreEmulator(db, '127.0.0.1', 8080);
  }
}

export default app;
