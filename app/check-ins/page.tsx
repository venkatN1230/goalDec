"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { Save, CheckCircle2, Circle, Clock, ArrowRight, Lock } from "lucide-react";
import { calculateProgress, MeasureType } from "@/lib/achievementEngine";
import { getCurrentCycle, isCheckInOpen } from "@/lib/scheduleEngine";

type TrackingStatus = 'Not Started' | 'On Track' | 'Completed';

interface ActiveGoal {
  id: string;
  title: string;
  measurementType: MeasureType;
  target: number;
  weightage: number;
  achievement: number;
  trackingStatus: TrackingStatus;
}

export default function EmployeeCheckIn() {
  const [goals, setGoals] = useState<ActiveGoal[]>([
    { id: "1", title: "Launch Enterprise SSO Integration", measurementType: "PERCENTAGE_MIN", target: 100, weightage: 50, achievement: 75, trackingStatus: 'On Track' },
    { id: "2", title: "Reduce Average Latency", measurementType: "NUMERIC_MAX", target: 200, weightage: 30, achievement: 250, trackingStatus: 'On Track' },
    { id: "3", title: "Complete Security Audit", measurementType: "ZERO_BASED", target: 0, weightage: 20, achievement: 0, trackingStatus: 'Completed' },
  ]);

  const currentCycle = getCurrentCycle();
  const checkInOpen = isCheckInOpen();

  const updateGoal = (id: string, field: keyof ActiveGoal, value: any) => {
    setGoals(goals.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const handleSave = () => {
    alert("Quarterly update saved successfully!");
  };

  return (
    <div className="flex h-screen bg-transparent overflow-hidden text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative p-8">
        <div className="max-w-5xl mx-auto relative z-10">
          
          <header className="mb-10 flex justify-between items-end">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Q3 Performance Check-in
              </motion.h1>
              <p className="text-gray-400">Log your actual achievements and update the tracking status for your locked goals.</p>
            </div>
            <button 
              onClick={handleSave}
              disabled={!checkInOpen}
              className="bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              <Save className="w-4 h-4" /> Save Update
            </button>
          </header>

          {/* Schedule Banner */}
          {!checkInOpen ? (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 text-yellow-400 text-sm font-medium"
            >
              <Lock className="w-5 h-5 flex-shrink-0" />
              <div>
                {currentCycle.message} Check-in updates are currently locked.
              </div>
            </motion.div>
          ) : (
             <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400 text-sm font-medium"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <div>
                {currentCycle.message}
              </div>
            </motion.div>
          )}

          <div className="space-y-6">
            {goals.map((goal, index) => {
              const progress = calculateProgress(goal.measurementType, goal.target, goal.achievement);
              
              return (
                <motion.div 
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">{goal.title}</h2>
                      <div className="text-sm text-gray-400 flex items-center gap-4 mt-2">
                        <span>Weightage: {goal.weightage}%</span>
                        <span>Type: {goal.measurementType.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">{progress.toFixed(0)}%</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Computed Progress</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-navy-800/50 p-4 rounded-xl border border-white/5">
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Planned Target</label>
                      <div className="text-lg font-semibold text-white px-3 py-2 bg-navy-900 rounded-lg border border-white/10">
                        {goal.measurementType === 'ZERO_BASED' ? 'Zero (Pass)' : goal.target}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Actual Achievement</label>
                      <input 
                        type="number" 
                        value={goal.achievement}
                        disabled={!checkInOpen}
                        onChange={(e) => updateGoal(goal.id, 'achievement', parseFloat(e.target.value))}
                        className="w-full bg-navy-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition font-semibold text-lg disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Status</label>
                      <select 
                        value={goal.trackingStatus}
                        disabled={!checkInOpen}
                        onChange={(e) => updateGoal(goal.id, 'trackingStatus', e.target.value as TrackingStatus)}
                        className={`w-full bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary transition appearance-none font-semibold disabled:opacity-50 ${
                          goal.trackingStatus === 'Completed' ? 'text-green-400' :
                          goal.trackingStatus === 'On Track' ? 'text-primary-light' : 'text-gray-400'
                        }`}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="On Track">On Track</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                  </div>
                  
                  {/* Visual Progress Bar */}
                  <div className="mt-6">
                    <div className="w-full h-2 bg-navy-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-primary'}`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}
