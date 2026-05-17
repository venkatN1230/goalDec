"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { Role } from "@/lib/RoleContext";
import { Zap, Mail, Lock, User as UserIcon, Shield, Briefcase, Loader2, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export default function AuthScreen() {
  const { login, signup } = useAuth();
  
  // Navigation tabs: 'login' | 'signup'
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  
  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<Role>('EMPLOYEE');
  
  // UI and loading states
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setErrorMsg("Please fill in all core credentials.");
      return;
    }
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsPending(true);
    
    try {
      const res = await login(loginEmail, loginPassword);
      if (res.success) {
        setSuccessMsg("Identity verified. Accessing quantum grid...");
      } else {
        setErrorMsg(res.error || "Authentication mismatch. Access denied.");
      }
    } catch (err) {
      setErrorMsg("Connection error while querying secure registry.");
    } finally {
      setIsPending(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      setErrorMsg("Please complete all profile information vectors.");
      return;
    }
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsPending(true);

    try {
      const res = await signup(signupName, signupEmail, signupPassword, signupRole);
      if (res.success) {
        setSuccessMsg("Core profile identity established! Syncing nodes...");
      } else {
        setErrorMsg(res.error || "Profile initialization failed.");
      }
    } catch (err) {
      setErrorMsg("Database connection failed. Unable to write identity.");
    } finally {
      setIsPending(false);
    }
  };

  const fillDemoCredentials = () => {
    setLoginEmail('goalsync26@gmail.com');
    setLoginPassword('1230');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4">
      {/* Premium background radial glowing elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Quantum cyber grid backdrop pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[500px] relative z-10 glass-dark rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden"
      >
        {/* Floating gradient top border lines */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-violet-500" />
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4 cursor-pointer relative group"
          >
            {/* Pulsing glow ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-400 to-violet-500 blur opacity-45 group-hover:opacity-75 transition duration-500" />
            <Zap className="w-7 h-7 text-white relative z-10 animate-pulse" />
          </motion.div>
          
          <h1 className="text-3xl font-extrabold text-white tracking-tight text-center">
            GoalSync <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">AI</span>
          </h1>
          <p className="text-gray-400 text-xs mt-1.5 uppercase tracking-widest font-semibold font-mono text-center">
            Quantum Performance & Command Console
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-navy-950/60 p-1.5 rounded-2xl border border-white/5 mb-6 relative">
          <button 
            type="button"
            onClick={() => { setTab('login'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all relative ${tab === 'login' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
          >
            {tab === 'login' && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              Access Portal
            </span>
          </button>
          
          <button 
            type="button"
            onClick={() => { setTab('signup'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all relative ${tab === 'signup' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
          >
            {tab === 'signup' && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              Provision Profile
            </span>
          </button>
        </div>

        {/* Status Alerts */}
        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 p-4 rounded-xl border border-red-500/20 bg-red-950/20 flex items-start gap-3 text-red-300 text-sm overflow-hidden"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 flex items-start gap-3 text-emerald-300 text-sm overflow-hidden"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forms Container */}
        <div className="relative">
          {tab === 'login' ? (
            <motion.form 
              key="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleLoginSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest font-mono mb-2">Mail Identity (Email)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    type="email" 
                    placeholder="Enter registered email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    disabled={isPending}
                    className="w-full bg-navy-950/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest font-mono mb-2">Security Credential Key (Password)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    type="password" 
                    placeholder="Enter security password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={isPending}
                    className="w-full bg-navy-950/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Quick Fill Preset Box */}
              <div className="p-4 rounded-xl border border-cyan-500/10 bg-cyan-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-cyan-300">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Preset Account:</strong><br />
                    <span className="font-mono text-[11px]">goalsync26@gmail.com</span> / <span className="font-mono text-[11px]">1230</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  disabled={isPending}
                  className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-cyan-200 font-bold transition-all text-center"
                >
                  Quick Autofill
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mt-4 relative overflow-hidden group border border-white/10"
              >
                {/* Inner shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying Secure Node...</span>
                  </>
                ) : (
                  <>
                    <span>Decrypt & Access Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.form 
              key="signup-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSignupSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest font-mono mb-2">Subject Name (Full Name)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <UserIcon className="w-4 h-4" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Dr. Aris Thorne"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    disabled={isPending}
                    className="w-full bg-navy-950/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest font-mono mb-2">Core Mail Identifier (Email)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    type="email" 
                    placeholder="user@goalsync.ai"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    disabled={isPending}
                    className="w-full bg-navy-950/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest font-mono mb-2">Security Password Key</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    disabled={isPending}
                    className="w-full bg-navy-950/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest font-mono mb-2">Assigned Quantum Clearance Node (Role)</label>
                <div className="grid grid-cols-3 gap-2 mt-1 bg-navy-950/50 p-1 rounded-xl border border-white/5">
                  {(['EMPLOYEE', 'MANAGER', 'ADMIN'] as Role[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      disabled={isPending}
                      onClick={() => setSignupRole(r)}
                      className={`py-2 rounded-lg text-[10px] font-bold tracking-wider transition-colors flex flex-col items-center justify-center gap-1 ${
                        signupRole === r 
                          ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-cyan-300 border border-cyan-500/40' 
                          : 'text-gray-400 hover:text-white border border-transparent'
                      }`}
                    >
                      {r === 'EMPLOYEE' && <UserIcon className="w-3.5 h-3.5" />}
                      {r === 'MANAGER' && <Briefcase className="w-3.5 h-3.5" />}
                      {r === 'ADMIN' && <Shield className="w-3.5 h-3.5" />}
                      <span>{r}</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mt-4 relative overflow-hidden group border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Writing Core Ledger...</span>
                  </>
                ) : (
                  <>
                    <span>Initialize Quantum Profile</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
