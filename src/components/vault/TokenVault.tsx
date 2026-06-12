"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, ShieldCheck, Wallet, ArrowUpRight } from "lucide-react";

export default function TokenVault() {
  const [balance, setBalance] = useState(315000);
  const rolloverRate = 0.05; // 5%

  const projectedBalance = Math.floor(balance * (1 + rolloverRate));
  const yieldAmount = Math.floor(balance * rolloverRate);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">The GNC Token Vault</h1>
        <p className="text-muted-foreground">Manage your GreenNodes equity ledger and track passive rollover yields.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 glass-card border-none glow-primary overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Coins size={120} className="text-primary rotate-12" />
          </div>
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                ACTIVE VAULT
              </Badge>
              <Badge className="bg-white/10 hover:bg-white/20 text-white cursor-help">
                Scale Tier ($950/mo)
              </Badge>
            </div>
            <CardTitle className="text-4xl font-black tracking-tight flex items-baseline gap-2">
              {balance.toLocaleString()}
              <span className="text-sm font-medium text-muted-foreground">GNC</span>
            </CardTitle>
            <CardDescription className="text-primary font-medium flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4" />
              +5% Active Rollover Yield enabled
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 space-y-4">
            <div className="p-4 rounded-xl bg-background/50 border border-white/5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Base Allocation</span>
                <span className="font-mono">250,000 GNC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accrued Yield</span>
                <span className="font-mono text-primary">+65,000 GNC</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between text-sm font-bold">
                <span>Vault Capacity</span>
                <span className="text-muted-foreground">Unlimited</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold border border-white/5 rounded-lg">
              <ShieldCheck className="h-3 w-3 text-primary" />
              ServiceNow Immutable State Ledger Verified
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 glass-card border-none h-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Yield Simulator Calculator
            </CardTitle>
            <CardDescription>Estimate your next month's opening balance with the 5% Compound formula.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-12 py-8">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">End of Month Target Balance</label>
                <span className="text-2xl font-bold font-mono">{balance.toLocaleString()} GNC</span>
              </div>
              <Slider 
                value={[balance]} 
                onValueChange={(val) => setBalance(val[0])}
                max={1000000} 
                step={1000}
                className="py-4"
              />
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground/50 tracking-tighter uppercase">
                <span>100k GNC</span>
                <span>500k GNC</span>
                <span>1M GNC</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 relative group">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Projected Rollover Yield</p>
                <p className="text-3xl font-black text-primary flex items-center gap-2">
                  <ArrowUpRight className="h-6 w-6" />
                  +{yieldAmount.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground mt-2">Calculated at 5% Active Yield factor.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Next Month Opening Balance</p>
                <p className="text-3xl font-black text-white">
                  {projectedBalance.toLocaleString()}
                  <span className="text-sm font-medium ml-1 text-muted-foreground">GNC</span>
                </p>
                <p className="text-[10px] text-muted-foreground mt-2">Compounded automatically on 1st of month.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
