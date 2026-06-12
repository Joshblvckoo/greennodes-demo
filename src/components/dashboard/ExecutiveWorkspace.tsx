"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell, PieChart, Pie, Legend
} from "recharts";
import { 
  Zap, 
  Trash2, 
  Coins, 
  Leaf, 
  Loader2, 
  RefreshCcw, 
  AlertTriangle, 
  Activity 
} from "lucide-react";

const PIE_DATA = [
  { name: 'Optimized', value: 65, color: 'hsl(var(--primary))' },
  { name: 'Under-Utilized', value: 25, color: 'hsl(var(--chart-3))' },
  { name: 'Zombie Resources', value: 10, color: 'hsl(var(--destructive))' },
];

const LINE_DATA = [
  { month: 'Jan', spend: 45000, carbon: 1200 },
  { month: 'Feb', spend: 42000, carbon: 1100 },
  { month: 'Mar', spend: 48000, carbon: 1050 },
  { month: 'Apr', spend: 38000, carbon: 980 },
  { month: 'May', spend: 32000, carbon: 850 },
  { month: 'Jun', spend: 28000, carbon: 720 },
];

export default function ExecutiveWorkspace() {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [metrics, setMetrics] = useState({
    spend: 142580,
    waste: 12450,
    tokens: 315000,
    carbon: 842
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        spend: prev.spend + (Math.random() * 10),
        tokens: prev.tokens + (Math.random() * 5),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Scan Complete",
        description: "Visual Studio Engine synchronized with ServiceNow State Ledger.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Executive Workspace</h1>
          <p className="text-muted-foreground mt-1">Real-time infrastructure intelligence and GreenOps overview.</p>
        </div>
        <Button 
          onClick={handleScan} 
          disabled={isScanning}
          className="glow-primary font-semibold h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning Infrastructure...
            </>
          ) : (
            <>
              <Activity className="mr-2 h-4 w-4" />
              Run On-Demand Cloud Scan
            </>
          )}
        </Button>
      </div>

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
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <RefreshCcw className="h-4 w-4 text-primary" />
              Cloud Spend vs Carbon Intensity
            </CardTitle>
            <CardDescription>Visualizing the decoupling of growth and emissions.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LINE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="spend" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                  activeDot={{ r: 6 }}
                  name="Monthly Spend ($)"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="carbon" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  name="Carbon Intensity Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Infrastructure Allocation
            </CardTitle>
            <CardDescription>Real-time resource utilization status.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full mt-4 space-y-2">
              {PIE_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
