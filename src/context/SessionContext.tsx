"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  login: (email: string | null) => void;
  finishLoading: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<SessionMetrics | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email: string | null) => {
    let name = "Global Sandbox Alpha";
    if (email && email.includes("@")) {
      const domain = email.split("@")[1];
      const part = domain.split(".")[0];
      name = part.charAt(0).toUpperCase() + part.slice(1);
    }

    const initialWaste = Math.floor(Math.random() * (15500 - 1200) + 1200);
    const initialCarbon = Math.floor(Math.random() * (2100 - 340) + 340);
    const initialTokens = Math.floor(Math.random() * (340000 - 85000) + 85000);
    const initialSpend = Math.floor(Math.random() * (250000 - 50000) + 50000);

    setCompanyName(name);
    setUserEmail(email);
    setMetrics({
      waste: initialWaste,
      carbon: initialCarbon,
      tokens: initialTokens,
      spend: initialSpend,
    });
    setIsLoading(true);
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
        login, 
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
