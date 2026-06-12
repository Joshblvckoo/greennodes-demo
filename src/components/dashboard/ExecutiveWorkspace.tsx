"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/context/SessionContext";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell, PieChart, Pie, Legend, ReferenceLine
} from "recharts";
import { 
  Zap, 
  Trash2, 
  Coins, 
  Leaf, 
  Loader2, 
  RefreshCcw, 
  AlertTriangle, 
  Activity,
  Terminal as TerminalIcon,
  Lightbulb,
  ArrowDownRight,
  Cpu
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { format, subDays, isWeekend } from "date-fns";

export default function ExecutiveWorkspace() {
  const { toast } = useToast();
  const { metrics: initialMetrics, companyName } = useSession();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [historyRange, setHistoryRange] = useState<7 | 14 | "full">(14);
  const scanTerminalRef = useRef<HTMLDivElement>(null);

  const [metrics, setMetrics] = useState({
    spend: initialMetrics?.spend || 142580,
    waste: initialMetrics?.waste || 12450,
    tokens: initialMetrics?.tokens || 315000,
    carbon: initialMetrics?.carbon || 842
  });

  // Generate historical data only on client to avoid hydration mismatch
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    const data = [];
    // Mocking "today" as June 20, 2026 for consistent demo timeline
    const baseDate = new Date(2026, 5, 20); 
    
    for (let i = 13; i >= 0; i--) {
      const date = subDays(baseDate, i);
      const isWeekEnd = isWeekend(date);
      const dayName = format(date, 'MMM dd');
      
      let spend = 45000 + Math.random() * 5000;
      let carbon = 1200 + Math.random() * 200;

      // 1. Weekend Drops (60% reduction)
      if (isWeekEnd) {
        spend *= 0.4;
        carbon *= 0.4;
      }

      // 2. Peak Season Spike (3-day operational spike in middle, around day 6-8 of history)
      if (i >= 5 && i <= 7) {
        spend *= 1.5;
        carbon *= 1.6;
      }

      // 3. Post-GreenNodes Drop (final 2 days)
      if (i <= 1) {
        spend *= 0.65;
        carbon *= 0.6;
      }

      data.push({
        day: dayName,
        spend: Math.round(spend),
        carbon: Math.round(carbon),
        isSpike: i >= 5 && i <= 7,
        isDrop: i <= 1
      });
    }
    setHistoricalData(data);
  }, []);

  const filteredHistory = useMemo(() => {
    if (historyRange === 7) return historicalData.slice(-7);
    return historicalData;
  }, [historicalData, historyRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        spend: prev.spend + (Math.random() * 5),
        tokens: prev.tokens + (Math.random() * 2),
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([]);
    
    const duration = 10000 + Math.random() * 5000;
    const zombieCount = Math.floor(Math.random() * 12) + 3;
    const startTime = Date.now();

    const assetLines = Array.from({ length: zombieCount }).map(() => {
      const id = Math.random().toString(36).substring(2, 10);
      const cpu = (Math.random() * 4).toFixed(1);
      return `[AUDIT] Asset ID i-${id} has a CPU utilization of ${cpu}%. Flagged as Zombie.`;
    });

    const script = [
      "[INIT] Establishing authenticated handshake via Firebase auth tokens...",
      "[SCANNING] Pinging regional cloud clusters (us-east-1, eu-west-1, asia-east-1)...",
      ...assetLines,
      "[GSF ENGINE] Computing SCI score: S = (E * I) + M...",
      "[SYNC] Writing immutable state ledger back to ServiceNow Core tables... Complete."
    ];

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < script.length) {
        const nextMessage = script[logIdx];
        if (nextMessage) {
          setScanLogs(prev => [...prev, nextMessage]);
        }
        logIdx++;
      }
    }, duration / (script.length + 1));

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min((elapsed / duration) * 100, 100);
      setScanProgress(prog);

      if (prog >= 100) {
        clearInterval(progressInterval);
        clearInterval(logInterval);
        setTimeout(() => {
          setIsScanning(false);
          toast({
            title: "Infrastructure Scan Complete",
            description: `Synchronized with ${companyName} ServiceNow State Ledger.`,
          });
        }, 800);
      }
    }, 50);
  };

  useEffect(() => {
    if (scanTerminalRef.current) {
      scanTerminalRef.current.scrollTop = scanTerminalRef.current.scrollHeight;
    }
  }, [scanLogs]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Executive Workspace</h1>
          <p className="text-muted-foreground mt-1">Real-time infrastructure intelligence for {companyName}.</p>
        </div>
        <Button 
          onClick={handleScan} 
          disabled={isScanning}
          className="glow-primary font-semibold h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scan in Progress...
            </>
          ) : (
            <>
              <Activity className="mr-2 h-4 w-4" />
              Run On-Demand Cloud Scan
            </>
          )}
        </Button>
      </div>

      {isScanning && (
        <Card className="border-none bg-black/40 overflow-hidden animate-in slide-in-from-top duration-500">
          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest px-1">
              <span className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-primary" />
                Optimization Engine Live Log
              </span>
              <span className="text-primary">{Math.round(scanProgress)}%</span>
            </div>
            <Progress value={scanProgress} className="h-1 bg-white/5" />
            <div 
              ref={scanTerminalRef}
              className="bg-black/40 rounded-lg p-4 h-32 overflow-y-auto font-mono text-[10px] space-y-1 scroll-smooth"
            >
              {scanLogs.map((log, i) => (
                <div key={i} className={log?.includes("Zombie") ? "text-destructive" : "text-white/60"}>
                  {log}
                </div>
              ))}
              <div className="animate-pulse inline-block w-1.5 h-3 bg-primary align-middle ml-1" />
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIItem 
          title="Total Infra Spend" 
          value={`$${metrics.spend.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          icon={<Zap className="h-5 w-5 text-primary" />}
          trend="+2.4% vs last mo"
        />
        <KPIItem 
          title="Wasted Cloud Budget" 
          value={`$${metrics.waste.toLocaleString()}`}
          icon={<Trash2 className="h-5 w-5 text-destructive" />}
          trend="-12% optimization target"
          isWaste
        />
        <KPIItem 
          title="Active Token Balance" 
          value={`${metrics.tokens.toLocaleString()} GNC`}
          icon={<Coins className="h-5 w-5 text-primary" />}
          trend="Scale Tier Status"
        />
        <KPIItem 
          title="Avoided Carbon" 
          value={`${metrics.carbon} kg CO2e`}
          icon={<Leaf className="h-5 w-5 text-accent" />}
          trend="+15.2% sustainability gain"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <RefreshCcw className="h-4 w-4 text-primary" />
                Cloud Spend & Carbon Intensity Timeline
              </CardTitle>
              <CardDescription>Simulated 14-day history demonstrating GreenNodes impact.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={historyRange === 7 ? "default" : "outline"} 
                size="sm" 
                onClick={() => setHistoryRange(7)}
                className="text-[10px] h-7 px-3"
              >7D</Button>
              <Button 
                variant={historyRange === 14 ? "default" : "outline"} 
                size="sm" 
                onClick={() => setHistoryRange(14)}
                className="text-[10px] h-7 px-3"
              >14D</Button>
              <Button 
                variant={historyRange === "full" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setHistoryRange("full")}
                className="text-[10px] h-7 px-3"
              >History</Button>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend iconType="circle" />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="spend" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                  activeDot={{ r: 6 }}
                  name="Daily Spend ($)"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="carbon" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  name="Carbon Intensity (kg)"
                />
                <ReferenceLine 
                  yAxisId="left"
                  x="Jun 14" 
                  stroke="hsl(var(--destructive))" 
                  label={{ position: 'top', value: 'Spike', fill: 'hsl(var(--destructive))', fontSize: 10 }} 
                />
                <ReferenceLine 
                  yAxisId="left"
                  x="Jun 19" 
                  stroke="hsl(var(--primary))" 
                  label={{ position: 'top', value: 'GN Active', fill: 'hsl(var(--primary))', fontSize: 10 }} 
                  strokeDasharray="3 3" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                GreenOps Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">💡</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Insight: High carbon intensity peaks correlate directly with your regional usage of the AWS us-east-1 grid between 2 PM and 6 PM. Consider shifting heavy batch workloads to overnight cycles.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">💡</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Insight: Automated weekend downscaling would preserve an estimated 45,000 GNC tokens per month in your Vault.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 space-y-2">
                <div className="flex items-center gap-2 text-destructive font-bold text-[10px] uppercase">
                  <AlertTriangle size={12} />
                  Efficiency Leak Alert
                </div>
                <p className="text-xs text-muted-foreground">
                  Spike detected in timeline caused a 40% carbon drift. Root cause: Major Software Release Deployment Drift.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <ArrowDownRight className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Post-Optimization</p>
                  <p className="text-xl font-black">-35% Emissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function KPIItem({ title, value, icon, trend, isWaste }: { title: string, value: string, icon: React.ReactNode, trend: string, isWaste?: boolean }) {
  return (
    <Card className="glass-card border-none group hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg bg-background border border-white/5 ${isWaste ? 'group-hover:border-destructive/30' : 'group-hover:border-primary/30'} transition-colors`}>
            {icon}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-background border border-white/5 ${isWaste ? 'text-destructive' : 'text-primary'}`}>
            Live
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{title}</p>
          <h3 className={`text-2xl font-bold tracking-tight ${isWaste ? 'text-destructive glow-destructive' : ''}`}>{value}</h3>
          <p className="text-[10px] text-muted-foreground font-medium">{trend}</p>
        </div>
      </CardContent>
    </Card>
  );
}
