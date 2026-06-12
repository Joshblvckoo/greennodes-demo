"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/SessionContext";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { generateAuditBlueprint } from "@/ai/flows/generate-audit-blueprint";
import { Loader2, Send, Sparkles, LayoutDashboard, CheckCircle } from "lucide-react";

export default function AuditRequest() {
  const { userEmail, companyName } = useSession();
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // State for form fields to enable pre-filling
  const [formDataState, setFormDataState] = useState({
    fullName: "",
    corporateEmail: userEmail || "",
  });

  useEffect(() => {
    if (userEmail) {
      setFormDataState(prev => ({ ...prev, corporateEmail: userEmail }));
    }
  }, [userEmail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      corporateEmail: formData.get("corporateEmail") as string,
      estimatedMonthlyCloudSpend: formData.get("spend") as string,
      primaryCloudProvider: formData.get("provider") as string,
    };

    try {
      const result = await generateAuditBlueprint(data);
      setBlueprint(result.blueprint);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to generate blueprint", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tight">
          Request Free 48-Hour <span className="text-primary glow-primary">Cloud Waste Audit</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get a comprehensive analysis of your cloud footprint and a personalized ServiceNow automation roadmap for {companyName || "your organization"}.
        </p>
      </div>

      <Card className="glass-card border-none overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          <div className="md:col-span-2 bg-primary/5 p-8 border-r border-white/5 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">What you get:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <div className="mt-1 p-1 bg-primary/20 rounded">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Zombie Resource Inventory</p>
                    <p className="text-muted-foreground">Detection of all idle infrastructure.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="mt-1 p-1 bg-primary/20 rounded">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Carbon Impact Report</p>
                    <p className="text-muted-foreground">Calculated footprint in CO2e.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="mt-1 p-1 bg-primary/20 rounded">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">ServiceNow Blueprint</p>
                    <p className="text-muted-foreground">Custom Executive Dashboard design.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="pt-8 opacity-50">
              <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            </div>
          </div>

          <CardContent className="md:col-span-3 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    placeholder="John Doe" 
                    required 
                    className="bg-background/50 border-white/5"
                    value={formDataState.fullName}
                    onChange={(e) => setFormDataState({...formDataState, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="corporateEmail">Corporate Email</Label>
                  <Input 
                    id="corporateEmail" 
                    name="corporateEmail" 
                    type="email" 
                    placeholder="john@company.com" 
                    required 
                    className="bg-background/50 border-white/5" 
                    value={formDataState.corporateEmail}
                    onChange={(e) => setFormDataState({...formDataState, corporateEmail: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spend">Monthly Cloud Spend</Label>
                  <Select name="spend" required>
                    <SelectTrigger className="bg-background/50 border-white/5">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Less than $1k">Less than $1k</SelectItem>
                      <SelectItem value="$1k-$10k">$1k-$10k</SelectItem>
                      <SelectItem value="$10k-$50k">$10k-$50k</SelectItem>
                      <SelectItem value="$50k-$100k">$50k-$100k</SelectItem>
                      <SelectItem value="More than $100k">More than $100k</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider">Primary Provider</Label>
                  <Select name="provider" required>
                    <SelectTrigger className="bg-background/50 border-white/5">
                      <SelectValue placeholder="Select cloud" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AWS">AWS</SelectItem>
                      <SelectItem value="GCP">GCP</SelectItem>
                      <SelectItem value="Azure">Azure</SelectItem>
                      <SelectItem value="Multi-Cloud">Multi-Cloud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 bg-primary text-primary-foreground font-black uppercase tracking-widest glow-primary hover:bg-primary/90 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Audit...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Claim Free Audit
                  </>
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-tighter">
                No credit card required. Audit delivery via secure corporate email only.
              </p>
            </form>
          </CardContent>
        </div>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col glass-card border-none">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <DialogTitle className="text-2xl font-black uppercase tracking-tight">Audit Request Received!</DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground">
              A GreenNodes Solutions Architect will deliver your full ServiceNow Executive Dashboard blueprint within 24 hours. Here is your initial AI-generated summary.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-4">
            <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground bg-black/40 p-6 rounded-xl border border-white/5">
              {blueprint}
            </div>
          </div>
          <DialogFooter className="p-6 pt-0 border-t border-white/5">
            <Button onClick={() => setShowModal(false)} className="w-full bg-primary text-primary-foreground font-bold">
              Got it, thanks!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
