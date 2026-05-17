"use client";

import { useAuth } from "@/lib/AuthContext";
import AuthScreen from "./AuthScreen";
import { Loader2, Zap } from "lucide-react";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-navy-950 text-white relative overflow-hidden">
        {/* Radial decorative glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none translate-x-10" />

        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-pulse relative">
            <div className="absolute -inset-1 rounded-2xl bg-cyan-500/30 blur animate-ping opacity-60" />
            <Zap className="w-7 h-7 text-white relative z-10" />
          </div>
          <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs font-semibold tracking-widest uppercase mt-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Establishing secure link...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return <>{children}</>;
}
