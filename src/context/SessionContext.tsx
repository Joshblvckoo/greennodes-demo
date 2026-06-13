"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut } from "firebase/auth";

interface SessionMetrics {
  waste: number;
  carbon: number;
  tokens: number;
  spend: number;
}

interface SessionContextType {
  companyName: string | null;
  userEmail: string | null;
  metrics: SessionMetrics | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialLoading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  finishLoading: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<SessionMetrics | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setIsInitialLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const storedEmail = localStorage.getItem('testerEmail') || user.email || "anonymous@tester.internal";
        setUserEmail(storedEmail);
        
        let name = "Global Sandbox Alpha";
        if (storedEmail && storedEmail.includes("@")) {
          const domain = storedEmail.split("@")[1];
          const part = domain.split(".")[0];
          name = part.charAt(0).toUpperCase() + part.slice(1);
        }
        setCompanyName(name);

        setMetrics({
          waste: Math.floor(Math.random() * (15500 - 1200) + 1200),
          carbon: Math.floor(Math.random() * (2100 - 340) + 340),
          tokens: Math.floor(Math.random() * (340000 - 85000) + 85000),
          spend: Math.floor(Math.random() * (250000 - 50000) + 50000),
        });
      } else {
        setIsAuthenticated(false);
        setCompanyName(null);
        setUserEmail(null);
        setMetrics(null);
        localStorage.removeItem('testerEmail');
      }
      setIsInitialLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email?: string, password?: string) => {
    const isFirebaseMissing = 
      !auth || 
      !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'undefined';

    if (isFirebaseMissing) {
      console.warn("⚠️ Production API keys missing in build bundle. Initiating GreenNodes Sandbox bypass protocol...");
      const guestEmail = email || "guest@sandbox.internal";
      setUserEmail(guestEmail);
      setCompanyName("Guest Sandbox Alpha");
      setIsLoading(true);
      return;
    }

    setIsLoading(true);
    try {
      if (email && password) {
        localStorage.setItem('testerEmail', email);
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const anonymousEmail = email || "anonymous@tester.internal";
        localStorage.setItem('testerEmail', anonymousEmail);
        await signInAnonymously(auth);
      }
    } catch (error: any) {
      console.error("Authentication submission error:", error);
      
      // Emergency catch-all bypass: If the live API rejects the keys at runtime, let the developer through anyway
      if (error.code === 'auth/invalid-api-key' || error.code === 'auth/internal-error' || error.message.includes('key')) {
        console.warn("⚠️ Live API rejection intercepted. Engaging presentation fallback mode.");
        setUserEmail(email || "presentation@sandbox.internal");
        setCompanyName("Demo Organization");
        return; // Proceed in loading state, finishLoading will set isAuthenticated
      }

      setIsLoading(false);
      if (error.code === 'auth/invalid-credential') {
        throw new Error("Invalid email address or access token password configuration.");
      }
      throw new Error(error.message || "Enterprise gateway connection interrupted.");
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Operations Error:", error);
    }
  };

  const finishLoading = () => {
    setIsLoading(false);
    setIsAuthenticated(true);
  };

  return (
    <SessionContext.Provider 
      value={{ 
        companyName, 
        userEmail,
        metrics, 
        isAuthenticated, 
        isLoading, 
        isInitialLoading,
        login, 
        logout,
        finishLoading 
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
