"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { Plus, Trash2, AlertCircle, Save, CheckCircle2, ChevronDown, Lock } from "lucide-react";
import { getCurrentCycle } from "@/lib/scheduleEngine";

type MeasureType = 'NUMERIC_MIN' | 'NUMERIC_MAX' | 'PERCENTAGE_MIN' | 'PERCENTAGE_MAX' | 'TIMELINE' | 'ZERO_BASED';

interface GoalInput {
  id: string;
  title: string;
  description: string;
  thrustArea: string;
  measurementType: MeasureType;
  target: number;
  weightage: number;
}

export default function CreateGoals() {
  const [goals, setGoals] = useState<GoalInput[]>([{
    id: '1', title: '', description: '', thrustArea: '', measurementType: 'PERCENTAGE_MIN', target: 0, weightage: 100
  }]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use a hardcoded date for demo purposes or rely on real time
  const currentCycle = getCurrentCycle(); 
  const isLocked = currentCycle.activePhase !== 'GOAL_SETTING';

  const totalWeightage = useMemo(() => goals.reduce((sum, g) => sum + (g.weightage || 0), 0), [goals]);
  const isWeightageValid = totalWeightage === 100;
  const isMinWeightageValid = goals.every(g => (g.weightage || 0) >= 10);
  const isMaxGoalsValid = goals.length <= 8;

  const addGoal = () => {
    if (goals.length >= 8) return;
    setGoals([...goals, {
      id: Math.random().toString(36).substr(2, 9),
      title: '', description: '', thrustArea: '', measurementType: 'PERCENTAGE_MIN', target: 0, weightage: 10
    }]);
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const updateGoal = (id: string, field: keyof GoalInput, value: any) => {
    setGoals(goals.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const handleSave = async (status: 'DRAFT' | 'SUBMITTED') => {
    if (status === 'SUBMITTED' && (!isWeightageValid || !isMinWeightageValid || !isMaxGoalsValid)) {
      alert("Please fix validation errors before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    // Mock API Call
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goals, status })
      });
      if (res.ok) {
        alert(`Goals ${status === 'DRAFT' ? 'saved as draft' : 'submitted successfully'}!`);
      }
    } catch (e) {
      console.error(e);
    }
    setIsSubmitting(false);
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
                Q3 Goal Setting Sheet
              </motion.h1>
              <p className="text-gray-400">Define your quarterly objectives. Max 8 goals. Total weightage must be exactly 100%.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => handleSave('DRAFT')}
                disabled={isLocked}
                className="glass px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> Save Draft
              </button>
              <button 
                onClick={() => handleSave('SUBMITTED')}
                disabled={!isWeightageValid || !isMinWeightageValid || !isMaxGoalsValid || isSubmitting || isLocked}
                className="bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                <CheckCircle2 className="w-4 h-4" /> Submit for Approval
              </button>
            </div>
          </header>

          {/* Schedule Banner */}
          <AnimatePresence>
            {isLocked && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 text-yellow-400 text-sm font-medium"
              >
                <Lock className="w-5 h-5 flex-shrink-0" />
                <div>
                  Goal Setting is currently locked. The system is in: {currentCycle.activePhase.replace('_', ' ')}.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Validation Banner */}
          <AnimatePresence>
            {(!isWeightageValid || !isMinWeightageValid) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm font-medium"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  {!isWeightageValid && <div>Total weightage must be exactly 100%. Current: {totalWeightage}%</div>}
                  {!isMinWeightageValid && <div>Minimum weightage per goal is 10%.</div>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            <AnimatePresence>
              {goals.map((goal, index) => (
                <motion.div 
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="glass-dark p-6 rounded-2xl border border-white/5 relative group"
                >
                  {goals.length > 1 && (
                    <button 
                      onClick={() => removeGoal(goal.id)}
                      className="absolute top-6 right-6 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary-light flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white">Goal Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 md:col-span-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Goal Title</label>
                        <input 
                          type="text" 
                          value={goal.title}
                          onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
                          className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
                          placeholder="E.g., Launch Enterprise SSO Integration"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
                        <textarea 
                          value={goal.description}
                          onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                          className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition h-20 resize-none"
                          placeholder="Details about how this will be achieved..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Thrust Area</label>
                      <select 
                        value={goal.thrustArea}
                        onChange={(e) => updateGoal(goal.id, 'thrustArea', e.target.value)}
                        className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition appearance-none"
                      >
                        <option value="">Select Area...</option>
                        <option value="Revenue">Revenue & Growth</option>
                        <option value="Product">Product Innovation</option>
                        <option value="Operations">Operational Excellence</option>
                        <option value="People">People & Culture</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Measurement Type</label>
                      <select 
                        value={goal.measurementType}
                        onChange={(e) => updateGoal(goal.id, 'measurementType', e.target.value as MeasureType)}
                        className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition appearance-none"
                      >
                        <option value="NUMERIC_MIN">Numeric (Higher is Better)</option>
                        <option value="NUMERIC_MAX">Numeric (Lower is Better)</option>
                        <option value="PERCENTAGE_MIN">Percentage (Higher is Better)</option>
                        <option value="PERCENTAGE_MAX">Percentage (Lower is Better)</option>
                        <option value="TIMELINE">Timeline / Days</option>
                        <option value="ZERO_BASED">Zero-based (Pass/Fail)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Target Value</label>
                      <input 
                        type="number" 
                        value={goal.target || ''}
                        onChange={(e) => updateGoal(goal.id, 'target', parseFloat(e.target.value))}
                        className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
                        placeholder="E.g., 100"
                        disabled={goal.measurementType === 'ZERO_BASED'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Weightage (%)</label>
                      <input 
                        type="number" 
                        value={goal.weightage || ''}
                        onChange={(e) => updateGoal(goal.id, 'weightage', parseInt(e.target.value))}
                        className={`w-full bg-navy-800 border rounded-lg px-4 py-2.5 text-white focus:outline-none transition ${
                          (goal.weightage || 0) < 10 ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary'
                        }`}
                      />
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {goals.length < 8 && (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={addGoal}
                className="w-full border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 text-gray-400 hover:text-primary-light rounded-2xl py-6 flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-primary/20 transition">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-medium">Add Another Goal</span>
                <span className="text-xs opacity-60">({goals.length}/8 goals added)</span>
              </motion.button>
            )}

          </div>

          <div className="h-20" />
        </div>
      </main>
    </div>
  );
}
