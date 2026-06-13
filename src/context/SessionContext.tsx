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

  // Helper to derive organization name from email domain
  const getOrgName = (email: string) => {
    if (!email || !email.includes("@")) return "Global Sandbox Alpha";
    const domain = email.split("@")[1];
    const part = domain.split(".")[0];
    return part.charAt(0).toUpperCase() + part.slice(1);
  };

  useEffect(() => {
    // 🛡️ INITIAL MOUNT: Check for existing bypass session
    const isBypassAuth = typeof window !== 'undefined' && localStorage.getItem('sandbox_authenticated') === 'true';
    if (isBypassAuth) {
      const storedEmail = localStorage.getItem('testerEmail') || "anonymous@tester.internal";
      setUserEmail(storedEmail);
      setCompanyName(getOrgName(storedEmail));
      setIsAuthenticated(true);
      
      setMetrics({
        waste: 12400,
        carbon: 840,
        tokens: 315000,
        spend: 75000,
      });
    }

    if (!auth) {
      setIsInitialLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Re-verify bypass flag on every auth change
      const stillBypassed = localStorage.getItem('sandbox_authenticated') === 'true';
      
      if (user || stillBypassed) {
        setIsAuthenticated(true);
        const activeEmail = user?.email || localStorage.getItem('testerEmail') || "anonymous@tester.internal";
        setUserEmail(activeEmail);
        setCompanyName(getOrgName(activeEmail));

        if (!metrics) {
          setMetrics({
            waste: Math.floor(Math.random() * (15500 - 1200) + 1200),
            carbon: Math.floor(Math.random() * (2100 - 340) + 340),
            tokens: Math.floor(Math.random() * (340000 - 85000) + 85000),
            spend: Math.floor(Math.random() * (250000 - 50000) + 50000),
          });
        }
      } else {
        setIsAuthenticated(false);
        setCompanyName(null);
        setUserEmail(null);
        setMetrics(null);
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

    setIsLoading(true);

    if (isFirebaseMissing) {
      console.warn("⚠️ Production API keys missing. Engaging Sandbox bypass...");
      const guestEmail = email || "guest@sandbox.internal";
      localStorage.setItem('testerEmail', guestEmail);
      localStorage.setItem('sandbox_authenticated', 'true');
      setUserEmail(guestEmail);
      setCompanyName(getOrgName(guestEmail));
      return;
    }

    try {
      if (email && password) {
        localStorage.setItem('testerEmail', email);
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const anonymousEmail = email || "anonymous@tester.internal";
        localStorage.setItem('testerEmail', anonymousEmail);
        await signInAnonymously(auth);
      }
      localStorage.setItem('sandbox_authenticated', 'true');
    } catch (error: any) {
      console.error("Auth error:", error);
      
      if (error.code === 'auth/invalid-api-key' || error.code === 'auth/internal-error' || error.message.includes('key')) {
        console.warn("⚠️ API Rejection. Engaging presentation fallback.");
        localStorage.setItem('sandbox_authenticated', 'true');
        const fallbackEmail = email || "presentation@sandbox.internal";
        setUserEmail(fallbackEmail);
        setCompanyName(getOrgName(fallbackEmail));
        return; 
      }

      setIsLoading(false);
      throw new Error(error.message || "Connection interrupted.");
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sandbox_authenticated');
    localStorage.removeItem('testerEmail');
    localStorage.removeItem('sandbox_tenant_focus');
    
    if (auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Sign out error:", error);
      }
    }
    
    // Refresh to clear all sensitive telemetry states
    window.location.href = '/';
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
