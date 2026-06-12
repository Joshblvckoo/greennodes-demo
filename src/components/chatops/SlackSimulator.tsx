"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hash, User, ShieldAlert, CheckCircle2, Cloud, Zap, Trash2, Cpu } from "lucide-react";

export default function SlackSimulator() {
  const [isResolved, setIsResolved] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResolve = () => {
    setShowConfirm(false);
    setIsResolved(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Two-Way Slack ChatOps</h1>
        <p className="text-muted-foreground">Interactive simulation of automated waste alerts and remediation.</p>
      </div>

      <div className="rounded-xl border border-white/5 bg-[#1a1d21] shadow-2xl overflow-hidden flex flex-col h-[600px]">
        {/* Slack Header */}
        <div className="h-14 border-b border-white/5 flex items-center px-4 justify-between bg-[#19171d]">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="font-bold text-sm">cloud-alerts-finops</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <User className="h-4 w-4" />
          </div>
        </div>

        {/* Slack Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#1a1d21]">
          <div className="flex gap-3">
            <Avatar className="h-9 w-9 rounded-sm">
              <AvatarImage src="https://picsum.photos/seed/slackbot/36/36" />
              <AvatarFallback className="rounded-sm bg-primary/20 text-primary">GN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-black text-[15px] hover:underline cursor-pointer">GreenNodes Bot</span>
                <span className="bg-[#e8f5fa] text-[#1264a3] text-[10px] px-1 font-bold rounded">APP</span>
                <span className="text-[12px] text-muted-foreground">11:42 AM</span>
              </div>

              {!isResolved ? (
                <div className="border-l-4 border-destructive bg-destructive/5 p-4 rounded-r-lg space-y-4 max-w-xl">
                  <div className="flex items-center gap-2 font-bold text-[#f2f2f2]">
                    <ShieldAlert className="h-4 w-4 text-destructive" />
                    ⚠️ Zombie Resource Detected (i-09fba241bc88)
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Cloud className="h-3 w-3" /> Provider
                      </p>
                      <p className="font-medium text-[#f2f2f2]">AWS EC2 (Production)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Cpu className="h-3 w-3" /> Utilization
                      </p>
                      <p className="font-medium text-destructive">1.2% CPU Peak (24h)</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-3 rounded bg-black/40 border border-white/5">
                    <div className="flex-1 text-center border-r border-white/10">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Financial Leak</p>
                      <p className="text-lg font-black text-destructive">$3.20/hr</p>
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Carbon Footprint</p>
                      <p className="text-lg font-black text-white">14.2 gCO2e/hr</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setShowConfirm(true)}
                      className="bg-destructive hover:bg-destructive/90 text-white font-bold h-9 px-4 text-sm"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Terminate Instance via ServiceNow
                    </Button>
                    <Button variant="outline" className="h-9 px-4 text-sm border-white/10 text-white hover:bg-white/5">
                      Dismiss
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg space-y-2 max-w-xl animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 font-bold text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    [RESOLVED] Resource safely terminated
                  </div>
                  <p className="text-sm text-[#f2f2f2]">
                    Instance <code className="bg-black/40 px-1 rounded">i-09fba241bc88</code> was terminated by engineer via automated ServiceNow Cloud Spoke.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground pt-2">
                    <Zap className="h-3 w-3 text-primary" />
                    SAVED $2,304/MO | -10.2kg CO2e Monthly
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Input Mockup */}
        <div className="p-4 bg-[#1a1d21]">
          <div className="border border-white/10 rounded-lg p-3 bg-transparent text-muted-foreground italic text-sm">
            Send a message to #cloud-alerts-finops
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="bg-card border-none ring-1 ring-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This will trigger an automated ServiceNow Flow to terminate the production EC2 instance i-09fba241bc88. This action is irreversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResolve} className="bg-destructive text-white hover:bg-destructive/90">
              Confirm Termination
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
