"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { TrendingUp, BarChart, Activity, UserCheck, PieChart } from "lucide-react";

export default function AnalyticsDashboard() {
  const qoqTrends = [
    { quarter: "Q1", value: 65 },
    { quarter: "Q2", value: 72 },
    { quarter: "Q3", value: 85 },
    { quarter: "Q4", value: 91 },
  ];

  const goalDistribution = [
    { area: "Revenue & Growth", percent: 45, color: "bg-green-500" },
    { area: "Product Innovation", percent: 25, color: "bg-primary" },
    { area: "Operational Excellence", percent: 20, color: "bg-violet-500" },
    { area: "People & Culture", percent: 10, color: "bg-yellow-500" },
  ];

  const managerEffectiveness = [
    { name: "Rachel Lee", completion: 98, onTimeCheckIns: 100 },
    { name: "David Kim", completion: 85, onTimeCheckIns: 90 },
    { name: "Sarah Chen", completion: 72, onTimeCheckIns: 60 },
  ];

  return (
    <div className="flex h-screen bg-transparent overflow-hidden text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative p-8">
        <div className="max-w-6xl mx-auto relative z-10">
          
          <header className="mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Organization Analytics
            </motion.h1>
            <p className="text-gray-400">Deep-dive into performance trends, goal distribution, and manager effectiveness.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* QoQ Trends */}
            <div className="glass-dark p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> QoQ Achievement Trends
              </h3>
              
              <div className="flex items-end justify-between h-48 gap-4 mt-8">
                {qoqTrends.map((trend, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end items-center gap-3">
                    <span className="text-sm font-bold text-white">{trend.value}%</span>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${trend.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-lg"
                    />
                    <span className="text-sm text-gray-400 font-medium">{trend.quarter}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Goal Distribution Analysis */}
            <div className="glass-dark p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-violet-400" /> Goal Distribution (By Thrust Area)
              </h3>
              
              <div className="space-y-6 mt-4">
                {goalDistribution.map((dist, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-medium">{dist.area}</span>
                      <span className="text-white font-bold">{dist.percent}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-navy-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${dist.percent}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full ${dist.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Manager Effectiveness Dashboard */}
          <div className="glass-dark p-6 rounded-2xl border border-white/5 mb-10">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-400" /> Manager Effectiveness Scorecard
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Manager Name</th>
                    <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Team Goal Completion</th>
                    <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">On-Time Check-ins</th>
                    <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Effectiveness Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {managerEffectiveness.map((mgr, i) => {
                    const rating = (mgr.completion + mgr.onTimeCheckIns) / 2;
                    return (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 text-white font-medium">{mgr.name}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-300 w-8">{mgr.completion}%</span>
                            <div className="w-24 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                              <div className={`h-full bg-primary w-[${mgr.completion}%]`} style={{ width: `${mgr.completion}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-300 w-8">{mgr.onTimeCheckIns}%</span>
                            <div className="w-24 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                              <div className={`h-full bg-violet-500 w-[${mgr.onTimeCheckIns}%]`} style={{ width: `${mgr.onTimeCheckIns}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            rating >= 90 ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            rating >= 75 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {rating >= 90 ? 'Exceptional' : rating >= 75 ? 'Strong' : 'Needs Focus'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
