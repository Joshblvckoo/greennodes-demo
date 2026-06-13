'use client';

import { useState } from 'react';
import { useSession } from '@/context/SessionContext';

export default function LoginGate() {
  const { login, isLoading } = useSession();
  const [selectedUseCase, setSelectedUseCase] = useState('whaleTracker');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEntry = async (useCaseMode: 'general' | 'specialized') => {
    setErrorMessage(null);
    try {
      await login();

      // Successful or bypassed handshake - commit session flags
      localStorage.setItem('sandbox_authenticated', 'true');
      
      if (useCaseMode === 'specialized') {
        localStorage.setItem('sandbox_tenant_focus', selectedUseCase);
        console.log(`Routing token authorized for specialized trace: ${selectedUseCase}`);
      } else {
        localStorage.setItem('sandbox_tenant_focus', 'whaleTracker');
        console.log("Routing token authorized for General Tester Profile");
      }

      window.location.hash = '#dashboard-view';
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initialize guest sandbox token.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl text-zinc-100 animate-in fade-in zoom-in duration-500">
      
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-emerald-600 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <span className="text-white font-black text-xl">GN</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tighter">GREENNODES CORE</h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold mt-2">Simulation Environment</p>
      </div>

      {errorMessage && (
        <div className="p-3 mb-4 bg-rose-950/40 border border-rose-900/50 text-rose-400 rounded text-xs font-mono animate-in slide-in-from-top-2">
          ⚠️ {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        
        {/* Pathway A */}
        <button
          onClick={() => handleEntry('general')}
          disabled={isLoading}
          className="group w-full p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg hover:border-emerald-500/50 transition-all text-left"
        >
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">General Access</h3>
            <span className="text-[10px] font-mono text-zinc-600">v1.4.2</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">Standard overview, GNR certification modules, and global waste matrices.</p>
          <div className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-[10px] font-black uppercase tracking-widest rounded text-center transition-colors">
            {isLoading ? 'HANDSHAKING...' : '🚀 INITIALIZE SESSION'}
          </div>
        </button>

        <div className="flex items-center my-4 text-[9px] uppercase font-bold text-zinc-700 tracking-[0.2em]">
          <div className="flex-grow h-px bg-zinc-800"></div>
          <span className="px-4">OR CHOOSE TRACK</span>
          <div className="flex-grow h-px bg-zinc-800"></div>
        </div>

        {/* Pathway B */}
        <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
          <div className="mb-4">
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Target Sector:</label>
            <select
              value={selectedUseCase}
              onChange={(e) => setSelectedUseCase(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-xs font-bold text-zinc-300 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="whaleTracker">🐋 WhaleTracker (Orbital)</option>
              <option value="jollofPay">💳 Jollof Pay (FinTech)</option>
              <option value="odysseyDestinations">✈️ Odyssey Destinations (AI)</option>
            </select>
          </div>

          <button
            onClick={() => handleEntry('specialized')}
            disabled={isLoading}
            className="w-full py-2.5 bg-zinc-850 border border-zinc-700 hover:border-blue-500 hover:text-blue-400 disabled:opacity-40 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded transition-all"
          >
            {isLoading ? 'PROVISIONING...' : '🔬 LAUNCH SPECIALIZED CASE'}
          </button>
        </div>

      </div>

      <div className="mt-8 text-center">
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
          🔒 SSL SECURED • GUEST ENCRYPTION ACTIVE
        </p>
      </div>

    </div>
  );
}
