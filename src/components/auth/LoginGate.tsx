
"use client";

import { useState } from 'react';
import { useSession } from '@/context/SessionContext';
import { ShieldCheck, Globe, FlaskConical, ChevronRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginGate() {
  const { login, isLoading } = useSession();
  const [selectedUseCase, setSelectedUseCase] = useState('whaleTracker');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEntry = async (useCaseMode: 'general' | 'specialized') => {
    setErrorMessage(null);
    try {
      // 1. Trigger the background Firebase anonymous handshake
      await login();

      // 2. Set context modifiers or router flags based on their choice
      if (useCaseMode === 'specialized') {
        localStorage.setItem('sandbox_tenant_focus', selectedUseCase);
        console.log(`Routing token authorized for specialized trace: ${selectedUseCase}`);
      } else {
        localStorage.setItem('sandbox_tenant_focus', 'general_metrics');
        console.log("Routing token authorized for General Tester Profile");
      }

      // 3. Force state check or reload to mount the authenticated dashboard router
      // In this app, the SessionContext state update triggers the AppContent view switch
      window.location.hash = '#dashboard-view';
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initialize guest sandbox token.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden font-body">
      {/* Ambient background effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 glow-primary mb-4">
            <ShieldCheck className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-emerald-400">
            GreenNodes Core
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
            Enterprise GreenOps & FinOps Environment Simulation Plane
          </p>
        </div>

        <div className="glass-card border-white/10 shadow-2xl bg-slate-900/50 p-6 space-y-6 rounded-2xl">
          {errorMessage && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-xs font-mono flex items-center gap-3">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Pathway A: Standard Anonymous Tester Entry */}
            <div className="group p-5 bg-white/5 border border-white/10 rounded-xl hover:border-primary/40 transition-all cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-slate-100">Option 1: General Access Sandbox</h3>
              </div>
              <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">
                Explore the standard product overview, GNR certification modules, and global cloud waste matrices.
              </p>
              
              <button
                onClick={() => handleEntry('general')}
                disabled={isLoading}
                className="w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 text-xs font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 glow-primary"
              >
                {isLoading ? 'Establishing Handshake...' : (
                  <>
                    🚀 Enter As General Tester
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {/* Divider Segment */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-grow h-px bg-white/5"></div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">OR</span>
              <div className="flex-grow h-px bg-white/5"></div>
            </div>

            {/* Pathway B: Target Use Case Scenario Dropdown Entry */}
            <div className="group p-5 bg-white/5 border border-white/10 rounded-xl hover:border-accent/40 transition-all cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <FlaskConical className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-bold text-slate-100">Option 2: Specialized Use Case</h3>
              </div>
              <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">
                Initialize the environment seeded directly with vertical telemetry structures and industry specific leaks.
              </p>
              
              <div className="space-y-2 mb-4">
                <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Target Track Sector:</label>
                <select
                  value={selectedUseCase}
                  onChange={(e) => setSelectedUseCase(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-pointer"
                >
                  <option value="whaleTracker">🐋 WhaleTracker (Orbital Telemetry)</option>
                  <option value="jollofPay">💳 Jollof Pay (FinTech Gateway)</option>
                  <option value="odysseyDestinations">✈️ Odyssey Destinations (AI Travel RAG)</option>
                </select>
              </div>

              <button
                onClick={() => handleEntry('specialized')}
                disabled={isLoading}
                className="w-full py-3 bg-slate-800 border border-white/5 hover:border-accent/50 hover:text-accent disabled:opacity-40 text-slate-300 text-xs font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? 'Provisioning Sector...' : (
                  <>
                    🔬 Launch Targeted Case
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer System Disclaimer */}
          <div className="text-center pt-2 border-t border-white/5">
            <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldCheck className="h-3 w-3" />
              Guest Session Mode • Anonymous Encryption Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
