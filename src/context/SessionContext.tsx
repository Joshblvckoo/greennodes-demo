
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

        // Generate consistent metrics for the session
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
    setIsLoading(true);
    try {
      if (email && password) {
        // Path A: Authenticated Enterprise Access
        localStorage.setItem('testerEmail', email);
        const credential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Enterprise Session Established:", credential.user.uid);
      } else {
        // Path B: Anonymous Guest Access (Sandbox environment)
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
          throw new Error("Client Handshake Blocked: Missing Environment Variables.");
        }
        if (email) {
          localStorage.setItem('testerEmail', email);
        } else {
          localStorage.setItem('testerEmail', "anonymous@tester.internal");
        }
        const anonymousUser = await signInAnonymously(auth);
        console.log("Sandbox Access Granted. Session ID:", anonymousUser.user.uid);
      }
    } catch (error: any) {
      console.warn("Auth Handshake Attempt Logged:", error.code);
      setIsLoading(false);

      // Map Firebase error codes to user-friendly messages
      if (error.code === 'auth/invalid-credential') {
        throw new Error("Invalid email address or access token password configuration.");
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error("The format of the email address provided is invalid.");
      }
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error("Authentication failed. Please check your corporate credentials.");
      }
      
      throw new Error(error.message || "Enterprise gateway connection interrupted. Try again later.");
    }
  };

  const logout = async () => {
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
