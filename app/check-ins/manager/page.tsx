"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { MessageSquare, Calendar, ChevronRight, Target } from "lucide-react";
import { calculateProgress, MeasureType } from "@/lib/achievementEngine";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  goals: {
    id: string;
    title: string;
    measurementType: MeasureType;
    target: number;
    achievement: number;
  }[];
  checkInComment: string;
  lastCheckIn: string;
}

export default function ManagerCheckIn() {
  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: "emp-1",
      name: "Alex Johnson",
      role: "Senior Engineer",
      avatar: "AJ",
      lastCheckIn: "2026-04-15",
      checkInComment: "",
      goals: [
        { id: "g1", title: "Launch Enterprise SSO", measurementType: "PERCENTAGE_MIN", target: 100, achievement: 75 },
        { id: "g2", title: "Reduce Average Latency", measurementType: "NUMERIC_MAX", target: 200, achievement: 250 },
      ]
    },
    {
      id: "emp-2",
      name: "Sarah Chen",
      role: "Product Designer",
      avatar: "SC",
      lastCheckIn: "2026-05-02",
      checkInComment: "Great progress on the design system. Need to focus on the mobile views next week.",
      goals: [
        { id: "g3", title: "Complete Design System V2", measurementType: "PERCENTAGE_MIN", target: 100, achievement: 90 },
      ]
    }
  ]);

  const [activeId, setActiveId] = useState(team[0].id);
  const activeMember = team.find(t => t.id === activeId);

  const updateComment = (id: string, comment: string) => {
    setTeam(team.map(t => t.id === id ? { ...t, checkInComment: comment } : t));
  };

  const handleSaveCheckIn = () => {
    alert("Manager check-in documented successfully.");
  };

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
              Quarterly Manager Check-ins
            </motion.h1>
            <p className="text-gray-400">Review team progress and document your 1:1 check-in discussions.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Team List Sidebar */}
            <div className="glass-dark p-4 rounded-2xl h-fit border border-white/5 space-y-2">
              <h2 className="text-sm font-semibold text-gray-400 mb-4 px-2 uppercase tracking-wider">Direct Reports</h2>
              {team.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setActiveId(member.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeId === member.id 
                      ? "bg-primary/20 border border-primary/30" 
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-sm border border-violet-500/30 flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="font-semibold text-white truncate">{member.name}</div>
                    <div className="text-xs text-gray-400 truncate mt-0.5">{member.role}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${activeId === member.id ? 'text-primary' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>

            {/* Check-in Interface */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {activeMember && (
                  <motion.div 
                    key={activeMember.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    
                    {/* Header Card */}
                    <div className="glass-dark p-6 rounded-2xl border border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-xl border border-violet-500/30">
                          {activeMember.avatar}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{activeMember.name}</h2>
                          <p className="text-gray-400">{activeMember.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 flex items-center gap-2 justify-end mb-1">
                          <Calendar className="w-4 h-4" /> Last Check-in
                        </div>
                        <div className="font-medium text-white">{activeMember.lastCheckIn}</div>
                      </div>
                    </div>

                    {/* Progress Review */}
                    <div className="glass-dark p-6 rounded-2xl border border-white/5">
                      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" /> Goal Progress Review
                      </h3>

                      <div className="space-y-4">
                        {activeMember.goals.map((goal) => {
                          const progress = calculateProgress(goal.measurementType, goal.target, goal.achievement);
                          
                          return (
                            <div key={goal.id} className="p-4 bg-navy-800 rounded-xl border border-white/10">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold text-white">{goal.title}</h4>
                                  <div className="text-xs text-gray-400 mt-1">Type: {goal.measurementType.replace('_', ' ')}</div>
                                </div>
                                <div className="text-right">
                                  <span className="text-lg font-bold text-white">{progress.toFixed(0)}%</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-6 mb-3 text-sm">
                                <div>
                                  <span className="text-gray-500 uppercase text-[10px] tracking-wider block mb-0.5">Planned Target</span>
                                  <span className="text-gray-300 font-medium">{goal.target}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 uppercase text-[10px] tracking-wider block mb-0.5">Actual Achievement</span>
                                  <span className="text-white font-medium">{goal.achievement}</span>
                                </div>
                              </div>

                              <div className="w-full h-1.5 bg-navy-900 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  transition={{ duration: 1 }}
                                  className={`h-full rounded-full ${progress >= 100 ? 'bg-green-500' : progress >= 50 ? 'bg-primary' : 'bg-red-500'}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Manager Notes */}
                    <div className="glass-dark p-6 rounded-2xl border border-white/5">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-violet-400" /> Document Check-in
                      </h3>
                      
                      <textarea
                        value={activeMember.checkInComment}
                        onChange={(e) => updateComment(activeMember.id, e.target.value)}
                        placeholder="Summarize the discussion, feedback provided, and next steps..."
                        className="w-full bg-navy-800 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-violet-500 transition resize-none h-32 mb-4"
                      />

                      <div className="flex justify-end">
                        <button 
                          onClick={handleSaveCheckIn}
                          className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                        >
                          Save Check-in Record
                        </button>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
