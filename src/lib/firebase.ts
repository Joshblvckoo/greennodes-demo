import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Guarantee safe client-side initialization execution
const isClient = typeof window !== 'undefined';
const app = isClient && getApps().length === 0 ? initializeApp(firebaseConfig) : getApps().length > 0 ? getApp() : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

// 🛡️ AIRTIGHT PRODUCTION ISOLATION BRIDGE
if (isClient && app && auth && db) {
  const hostname = window.location.hostname;
  
  // Only connect to emulators if explicitly executing on localhost or inside your Cloud Workstation domain
  const isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1';
  const isCloudWorkstation = hostname.includes('cloudworkstations.dev');
  
  // Hard safety: If it contains 'vercel.app', explicitly force production routing path
  const isVercelDeployment = hostname.includes('vercel.app');

  if ((isLocalDev || isCloudWorkstation) && !isVercelDeployment && process.env.NODE_ENV === 'development') {
    console.log("🔌 Workspace Detected: Routing authentication to Firebase Studio Emulator...");
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
  } else {
    console.log("🚀 Production Nexus Engaged: Routing telemetry securely to live Google Cloud API Gateway.");
  }
}

export default app;