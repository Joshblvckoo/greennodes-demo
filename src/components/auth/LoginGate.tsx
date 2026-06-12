
"use client";

import React, { useState } from "react";
import { useSession } from "@/context/SessionContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Mail, Globe, Lock } from "lucide-react";

export default function LoginGate() {
  const { login } = useSession();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password || undefined);
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Session Fault",
        description: err.message || "Failed to establish environment handshake.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestAccess = async () => {
    setIsSubmitting(true);
    try {
      await login(null);
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Guest Access Fault",
        description: err.message || "Public demo sandbox mode unavailable.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 glow-primary mb-4">
            <ShieldCheck className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-emerald-400">
            GreenNodes Core
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Enterprise GreenOps Environment Entry</p>
        </div>

        <Card className="glass-card border-white/10 shadow-2xl bg-slate-900">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Session Login</CardTitle>
            <CardDescription>
              Enter your corporate credentials to establish an authenticated session handshake.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold opacity-70">
                    Corporate Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-950 border-white/10 pl-10 h-12 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs uppercase tracking-widest font-bold opacity-70">
                    Access Token / Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-950 border-white/10 pl-10 h-12 text-white"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 block italic">
                    💡 Leave blank for Public Demo Sandbox Mode
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest glow-primary"
                >
                  {isSubmitting ? "Establishing Session..." : "Establish Session Handshake"}
                </Button>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">OR</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={isSubmitting}
                  onClick={handleGuestAccess}
                  className="w-full h-12 border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Access as Anonymous Guest
                </Button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-tighter">
                🔒 Privacy Note: Your input is used purely to personalize your sandboxed instance variables. No spam, ever.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
