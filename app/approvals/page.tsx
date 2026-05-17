"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { CheckCircle2, XCircle, AlertCircle, MessageSquare, Target } from "lucide-react";

type GoalStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'RETURNED' | 'LOCKED';

interface EmployeeGoal {
  id: string;
  title: string;
  thrustArea: string;
  target: number;
  weightage: number;
  status: GoalStatus;
  shared: boolean;
}

interface EmployeeSubmission {
  id: string;
  name: string;
  role: string;
  goals: EmployeeGoal[];
}

export default function ApprovalsPage() {
  const [submissions, setSubmissions] = useState<EmployeeSubmission[]>([
    {
      id: "emp-1",
      name: "Alex Johnson",
      role: "Senior Software Engineer",
      goals: [
        { id: "g1", title: "Launch Enterprise SSO", thrustArea: "Product", target: 100, weightage: 60, status: 'SUBMITTED', shared: false },
        { id: "g2", title: "Mentorship Program", thrustArea: "People", target: 2, weightage: 40, status: 'SUBMITTED', shared: true }
      ]
    }
  ]);

  const [activeSubmission, setActiveSubmission] = useState<string | null>(submissions[0].id);
  const [feedback, setFeedback] = useState("");

  const activeEmployee = submissions.find(s => s.id === activeSubmission);

  const updateGoal = (empId: string, goalId: string, field: keyof EmployeeGoal, value: any) => {
    setSubmissions(submissions.map(emp => {
      if (emp.id !== empId) return emp;
      return {
        ...emp,
        goals: emp.goals.map(g => g.id === goalId ? { ...g, [field]: value } : g)
      };
    }));
  };

  const handleAction = async (empId: string, action: 'APPROVE' | 'RETURN') => {
    // In a real app, this would hit /api/goals/approve
    const emp = submissions.find(s => s.id === empId);
    if (!emp) return;

    if (action === 'APPROVE') {
      const totalWeight = emp.goals.reduce((acc, g) => acc + g.weightage, 0);
      if (totalWeight !== 100) {
        alert("Cannot approve. Adjusted total weightage must be exactly 100%.");
        return;
      }
    }

    const newStatus = action === 'APPROVE' ? 'LOCKED' : 'RETURNED';

    setSubmissions(submissions.map(s => {
      if (s.id !== empId) return s;
      return {
        ...s,
        goals: s.goals.map(g => ({ ...g, status: newStatus }))
      };
    }));

    alert(`Goals ${action === 'APPROVE' ? 'Approved & Locked' : 'Returned for Rework'}`);
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
              Manager L1 Approvals
            </motion.h1>
            <p className="text-gray-400">Review team goals. Edit inline, approve to lock, or return for rework.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Employee List Sidebar */}
            <div className="glass-dark p-4 rounded-2xl h-fit border border-white/5 space-y-2">
              <h2 className="text-sm font-semibold text-gray-400 mb-4 px-2 uppercase tracking-wider">Pending Review</h2>
              {submissions.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubmission(sub.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    activeSubmission === sub.id 
                      ? "bg-primary/20 border border-primary/30" 
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="font-semibold text-white">{sub.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{sub.role}</div>
                  <div className="text-xs mt-2 flex items-center gap-1 text-primary-light">
                    <Target className="w-3 h-3" /> {sub.goals.length} Goals
                  </div>
                </button>
              ))}
            </div>

            {/* Main Approval Panel */}
            <div className="lg:col-span-3 space-y-6">
              <AnimatePresence mode="wait">
                {activeEmployee && (
                  <motion.div 
                    key={activeEmployee.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-dark p-6 rounded-2xl border border-white/5 relative"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{activeEmployee.name}'s Q3 Goals</h2>
                        <div className="text-sm text-gray-400 mt-1 flex gap-4">
                          <span>Total Weightage: {activeEmployee.goals.reduce((acc, g) => acc + g.weightage, 0)}%</span>
                          <span className={activeEmployee.goals[0].status === 'LOCKED' ? 'text-green-400' : 'text-yellow-400'}>
                            Status: {activeEmployee.goals[0].status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {activeEmployee.goals.map((goal, index) => (
                        <div key={goal.id} className="p-4 bg-navy-800 rounded-xl border border-white/10">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">{index + 1}. {goal.title}</span>
                                {goal.shared && (
                                  <span className="text-[10px] uppercase bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded border border-violet-500/30">
                                    Shared KPI
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-400 mt-1 block">Area: {goal.thrustArea}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-400 mb-1 block">Target</label>
                              <input 
                                type="number" 
                                value={goal.target}
                                disabled={goal.shared || goal.status === 'LOCKED'}
                                onChange={(e) => updateGoal(activeEmployee.id, goal.id, 'target', parseFloat(e.target.value))}
                                className="w-full bg-navy-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary disabled:opacity-50"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 mb-1 block">Weightage (%)</label>
                              <input 
                                type="number" 
                                value={goal.weightage}
                                disabled={goal.status === 'LOCKED'}
                                onChange={(e) => updateGoal(activeEmployee.id, goal.id, 'weightage', parseInt(e.target.value))}
                                className="w-full bg-navy-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary disabled:opacity-50"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {activeEmployee.goals[0].status === 'SUBMITTED' && (
                      <div className="border-t border-white/10 pt-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Manager Feedback
                          </label>
                          <textarea 
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Add comments or reasons for rework..."
                            className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition resize-none h-24"
                          />
                        </div>

                        <div className="flex gap-4 justify-end">
                          <button 
                            onClick={() => handleAction(activeEmployee.id, 'RETURN')}
                            className="px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-red-500/10 text-red-400 border border-red-500/20 transition flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" /> Return for Rework
                          </button>
                          <button 
                            onClick={() => handleAction(activeEmployee.id, 'APPROVE')}
                            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-[0_0_15px_rgba(22,163,74,0.4)]"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Approve & Lock Goals
                          </button>
                        </div>
                      </div>
                    )}
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
