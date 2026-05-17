"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { Shield, Unlock, RefreshCw, BarChart3, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { getCurrentCycle } from "@/lib/scheduleEngine";

export default function AdminConsole() {
  const [employees, setEmployees] = useState([
    { id: "emp-1", name: "Alex Johnson", department: "Engineering", goalsLocked: true, lastUnlock: null },
    { id: "emp-2", name: "Sarah Chen", department: "Design", goalsLocked: true, lastUnlock: null },
    { id: "emp-3", name: "Michael Chang", department: "Sales", goalsLocked: false, lastUnlock: "2026-05-15" }
  ]);

  const [cycleOverride, setCycleOverride] = useState<string>('AUTO');
  const currentCycle = getCurrentCycle();

  const handleUnlock = (id: string) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, goalsLocked: false, lastUnlock: new Date().toISOString().split('T')[0] } : emp
    ));
    alert("Goals unlocked successfully. The employee now has 48 hours to make edits before auto-locking.");
  };

  return (
    <div className="flex h-screen bg-transparent overflow-hidden text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative p-8">
        <div className="max-w-6xl mx-auto relative z-10">
          
          <header className="mb-10 flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2 flex items-center gap-3"
              >
                <Shield className="w-8 h-8 text-red-400" /> Admin Console
              </motion.h1>
              <p className="text-gray-400">Configure system cycles, oversee completion rates, and manage exceptions.</p>
            </div>
            
            <div className="text-right glass-dark p-4 rounded-xl border border-white/5">
              <div className="text-sm text-gray-400 mb-1">System Status</div>
              <div className="flex items-center gap-2 text-green-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> All Systems Nominal
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Cycle & Org Stats */}
            <div className="space-y-8">
              
              {/* Cycle Management */}
              <div className="glass-dark p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" /> Cycle Management
                </h3>
                
                <div className="p-4 bg-navy-800 rounded-xl border border-white/10 mb-4">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Current Active Phase</div>
                  <div className="text-lg font-bold text-white">{currentCycle.activePhase.replace('_', ' ')}</div>
                  <p className="text-sm text-gray-400 mt-2">{currentCycle.message}</p>
                </div>

                <label className="block text-sm font-medium text-gray-400 mb-2">Override System Cycle (Testing Only)</label>
                <select 
                  value={cycleOverride}
                  onChange={(e) => setCycleOverride(e.target.value)}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-red-400 transition appearance-none font-semibold"
                >
                  <option value="AUTO">Auto (System Date)</option>
                  <option value="GOAL_SETTING">Force: Goal Setting</option>
                  <option value="Q1_CHECK_IN">Force: Q1 Check-in</option>
                  <option value="LOCKED">Force: Lock All</option>
                </select>
              </div>

              {/* Completion Overview */}
              <div className="glass-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" /> Org Completion Rates
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white font-medium">Engineering</span>
                      <span className="text-green-400">92%</span>
                    </div>
                    <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[92%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white font-medium">Sales</span>
                      <span className="text-yellow-400">68%</span>
                    </div>
                    <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 w-[68%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white font-medium">Design</span>
                      <span className="text-primary-light">85%</span>
                    </div>
                    <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-light w-[85%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Exception Handling */}
            <div className="lg:col-span-2">
              <div className="glass-dark p-6 rounded-2xl border border-white/5 border-t-4 border-t-red-500">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" /> Exception Handling: Goal Unlocks
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Administrative overrides to unlock employee goal sheets outside of the standard Goal Setting window. 
                  Unlocks automatically expire after 48 hours.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Employee</th>
                        <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Department</th>
                        <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {employees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-white/5 transition-colors group">
                          <td className="py-4 text-white font-medium">{emp.name}</td>
                          <td className="py-4 text-gray-400 text-sm">{emp.department}</td>
                          <td className="py-4">
                            {emp.goalsLocked ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                Locked
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                                <Unlock className="w-3 h-3" /> Unlocked ({emp.lastUnlock})
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            {emp.goalsLocked && (
                              <button 
                                onClick={() => handleUnlock(emp.id)}
                                className="text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded transition opacity-0 group-hover:opacity-100 border border-red-500/20"
                              >
                                Unlock Goals
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
