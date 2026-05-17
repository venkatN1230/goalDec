"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { Plus, Target, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight, Bot, Zap, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const kpis = [
    { title: "Global Org Alignment", value: "92%", trend: "+14%", positive: true, icon: Target },
    { title: "Critical Milestones Met", value: "128", trend: "+8%", positive: true, icon: TrendingUp },
    { title: "At-Risk Quantum Nodes", value: "2", trend: "-1%", positive: false, icon: AlertTriangle },
  ];

  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Header Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

        <div className="p-8 max-w-7xl mx-auto relative z-10">
          <header className="flex justify-between items-center mb-10">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Welcome back, Dr. Aris Thorne 👋
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400"
              >
                Nexis Core Global Command | Neural Architecture Division
              </motion.p>
            </div>
            <div className="flex gap-4 items-center">
              <button className="glass px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition flex items-center gap-2 border border-white/5 shadow-lg">
                <Bot className="w-4 h-4 text-violet-500" />
                AI Insights
              </button>
              
              <Link href="/goals/create">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group cursor-pointer"
                >
                  {/* Outer glowing halo */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-primary to-violet-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                  
                  {/* Rotating border effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-primary opacity-0 group-hover:opacity-100 transition duration-500 [mask-image:linear-gradient(white,transparent)]"></div>
                  
                  {/* Button surface */}
                  <div className="relative flex items-center gap-2 px-6 py-2.5 bg-navy-900 border border-white/10 rounded-xl text-white font-semibold shadow-2xl overflow-hidden">
                    {/* Inner sheen */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    
                    <div className="relative flex items-center gap-2 z-10">
                      <div className="relative flex items-center justify-center">
                        <PlusCircle className="w-5 h-5 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-cyan-400 blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                      </div>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-cyan-100 group-hover:to-white transition-colors">
                        New Goal Project
                      </span>
                      <Zap className="w-4 h-4 text-violet-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </header>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark p-6 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <kpi.icon className={`w-6 h-6 ${i === 2 ? 'text-red-400' : 'text-primary-light'}`} />
                  </div>
                  <span className={`flex items-center text-sm font-medium ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {kpi.positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                    {kpi.trend}
                  </span>
                </div>
                
                <h3 className="text-gray-400 text-sm font-medium mb-1">{kpi.title}</h3>
                <p className="text-3xl font-bold text-white">{kpi.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Active Goals List */}
            <div className="lg:col-span-2 glass-dark p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Your Q3 Strategic Initiatives</h2>
                <button className="text-sm text-cyan-400 hover:text-cyan-300 transition">View All Projects</button>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Stabilize Core Qubit Matrix Array (Phase 4)", category: "Quantum Physics R&D", progress: 88, status: "On Track" },
                  { title: "Integrate Azure AI Compute Cluster Beta", category: "Cloud Infrastructure", progress: 65, status: "On Track" },
                  { title: "Reduce Neural Sync Latency to < 5ms", category: "Network Optimization", progress: 32, status: "At Risk" },
                  { title: "Secure Series C Funding ($150M Tranche)", category: "Executive Ops", progress: 100, status: "Completed" }
                ].map((goal, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="p-4 rounded-xl border border-cyan-500/10 hover:bg-cyan-500/5 transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-white text-sm mb-1">{goal.title}</h3>
                        <span className="text-xs text-cyan-300 bg-cyan-900/30 border border-cyan-500/20 px-2 py-1 rounded-md uppercase tracking-wider">{goal.category}</span>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                        goal.status === 'On Track' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 
                        goal.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                        'bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400 uppercase tracking-widest text-[10px]">Completion Vector</span>
                        <span className="text-white font-bold font-mono">{goal.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-navy-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                          className={`h-full rounded-full ${
                            goal.status === 'On Track' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 
                            goal.status === 'Completed' ? 'bg-gradient-to-r from-green-600 to-green-400' :
                            'bg-red-500'}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Assistant Panel */}
            <div className="glass-dark p-6 rounded-2xl border border-violet-500/20 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-500/20 rounded-lg border border-violet-500/30">
                  <Bot className="w-5 h-5 text-violet-400" />
                </div>
                <h2 className="text-lg font-bold text-white">AI Performance Insights</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-navy-800/80 rounded-xl border border-violet-500/20 text-sm shadow-inner">
                  <p className="text-gray-300 leading-relaxed">
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">System Alert:</span> The <span className="text-white font-bold">Network Optimization</span> initiative is experiencing sub-optimal trajectory. Predictive models indicate a 94% chance of missing the latency threshold.
                  </p>
                  <button className="mt-3 text-cyan-400 hover:text-cyan-300 text-[11px] uppercase tracking-wider font-bold flex items-center bg-cyan-900/30 px-3 py-1.5 rounded-lg border border-cyan-500/30">
                    Calculate Rerouting Solutions <ArrowUpRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
                
                <div className="p-4 bg-navy-800/80 rounded-xl border border-green-500/20 text-sm shadow-inner">
                  <p className="text-gray-300 leading-relaxed">
                    <span className="text-green-400 font-bold uppercase tracking-widest text-xs">Node Success:</span> Funding tranche successfully verified. Resources unlocked for Quantum Architecture expansion. 
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
