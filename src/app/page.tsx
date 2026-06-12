"use client";

import React, { useState } from "react";
import ExecutiveWorkspace from "@/components/dashboard/ExecutiveWorkspace";
import TokenVault from "@/components/vault/TokenVault";
import SlackSimulator from "@/components/chatops/SlackSimulator";
import AuditRequest from "@/components/audit/AuditRequest";
import GSFCertificationQuiz from "@/components/quiz/GSFCertificationQuiz";
import LoginGate from "@/components/auth/LoginGate";
import LoadingHandshake from "@/components/auth/LoadingHandshake";
import { SessionProvider, useSession } from "@/context/SessionContext";
import { Toaster } from "@/components/ui/toaster";
import { 
  LayoutDashboard, 
  Coins, 
  MessageSquare, 
  ClipboardList, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Award,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type View = "dashboard" | "vault" | "chatops" | "audit" | "certification";

function AppContent() {
  const { isAuthenticated, isLoading, companyName, logout } = useSession();
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!isAuthenticated && !isLoading) {
    return <LoginGate />;
  }

  if (isLoading) {
    return <LoadingHandshake />;
  }

  const navigation = [
    { id: "dashboard", name: "Executive Workspace", icon: LayoutDashboard },
    { id: "vault", name: "The GNC Token Vault", icon: Coins },
    { id: "chatops", name: "Slack ChatOps Simulator", icon: MessageSquare },
    { id: "certification", name: "GSF Certification", icon: Award },
    { id: "audit", name: "Cloud Waste Audit", icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-background flex text-foreground animate-in fade-in duration-1000">
      {/* Sidebar Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-white/5 lg:hidden"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen z-40 bg-card border-r border-white/5 transition-all duration-300 flex flex-col overflow-hidden shrink-0",
        isSidebarOpen ? "w-72" : "w-0 lg:w-20"
      )}>
        <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center glow-primary">
              <ShieldCheck className="text-primary-foreground h-5 w-5" />
            </div>
            {isSidebarOpen && <span className="font-black text-lg tracking-tighter uppercase">GreenNodes <span className="text-primary">Core</span></span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id as View);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                activeView === item.id 
                  ? "bg-primary text-primary-foreground glow-primary font-bold" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", activeView === item.id ? "" : "group-hover:text-primary transition-colors")} />
              {isSidebarOpen && <span className="text-sm truncate">{item.name}</span>}
              {activeView === item.id && isSidebarOpen && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
              {!isSidebarOpen && activeView === item.id && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 shrink-0">
          <div className={cn(
            "p-4 rounded-2xl bg-white/5 border border-white/5",
            isSidebarOpen ? "block" : "hidden"
          )}>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Network Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-xs font-medium">Mainnet Ledger Connected</span>
            </div>
          </div>
          {!isSidebarOpen && (
             <div className="flex justify-center p-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-0 h-screen overflow-y-auto bg-[#020617] relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto p-6 lg:p-12 pb-24">
          <header className="mb-8 flex justify-between items-end animate-in slide-in-from-top duration-700">
            <div className="flex-1">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">{companyName} Cloud FinOps & GreenOps Control Center</h2>
              <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              className="ml-6 h-9 border-white/10 text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all font-bold text-xs uppercase tracking-widest"
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Logout Session
            </Button>
          </header>

          {activeView === "dashboard" && <ExecutiveWorkspace />}
          {activeView === "vault" && <TokenVault />}
          {activeView === "chatops" && <SlackSimulator />}
          {activeView === "certification" && <GSFCertificationQuiz onAuditClick={() => setActiveView("audit")} />}
          {activeView === "audit" && <AuditRequest />}
        </div>
      </main>

      <Toaster />
    </div>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}
