"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { Download, FileSpreadsheet, CheckSquare, History, Search } from "lucide-react";

export default function ReportsAndAudit() {
  const [auditSearch, setAuditSearch] = useState("");

  const completionData = [
    { department: "Quantum Physics R&D", employees: 120, checkInsCompleted: 115, managersCompleted: 10 },
    { department: "Neural Architecture", employees: 85, checkInsCompleted: 80, managersCompleted: 8 },
    { reductions: "Global Cybernetics", employees: 24, checkInsCompleted: 24, managersCompleted: 3 },
  ];

  const auditLogs = [
    { id: 1, date: "2026-05-15 14:30:22", user: "Admin (J. Smith)", action: "UNLOCKED_GOALS", targetUser: "Dr. Aris Thorne", details: "Override granted for Quantum Node reconfiguration." },
    { id: 2, date: "2026-05-16 09:15:00", user: "Dr. Aris Thorne", action: "UPDATED_WEIGHTAGE", targetUser: "Dr. Aris Thorne", details: "Changed 'Core Qubit Matrix' weight from 40% to 50%." },
    { id: 3, date: "2026-05-16 11:20:45", user: "System Override", action: "AUTO_LOCKED", targetUser: "Dr. Aris Thorne", details: "Goals re-locked post override window." },
  ];

  const handleExportCSV = () => {
    // Mock CSV Export Logic
    const headers = "Operative Name,Division,Strategic Initiative,Measurement Type,Planned Vector,Actual Alignment,Status\n";
    const row = "Dr. Aris Thorne,Neural Architecture,Stabilize Core Qubit Matrix Array,PERCENTAGE_MIN,100,88,On Track\n";
    const csvContent = "data:text/csv;charset=utf-8," + headers + row;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Q3_Achievement_Report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
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
                className="text-3xl font-bold text-white mb-2"
              >
                Reports & Governance
              </motion.h1>
              <p className="text-gray-400">Export compliance reports and monitor the system audit trail.</p>
            </div>
            
            <button 
              onClick={handleExportCSV}
              className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-[0_0_15px_rgba(22,163,74,0.4)]"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export Achievement Report (CSV)
            </button>
          </header>

          <div className="space-y-8">
            
            {/* Completion Dashboard */}
            <div className="glass-dark p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" /> Q3 Check-in Completion Status
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Division</th>
                      <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Operatives</th>
                      <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Alignment Completion</th>
                      <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Command Completion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {completionData.map((data, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 text-white font-medium">{data.department || (data as any).reductions}</td>
                        <td className="py-4 text-gray-400 text-center">{data.employees}</td>
                        <td className="py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            data.checkInsCompleted === data.employees 
                              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                          }`}>
                            {data.checkInsCompleted} / {data.employees} ({(data.checkInsCompleted/data.employees*100).toFixed(0)}%)
                          </span>
                        </td>
                        <td className="py-4 text-center text-gray-300">
                          {data.managersCompleted} Managers
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Audit Trail */}
            <div className="glass-dark p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-violet-400" /> System Audit Trail
                </h3>
                
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search logs..."
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    className="bg-navy-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition w-64"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Timestamp (UTC)</th>
                      <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Actor</th>
                      <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                      <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Target</th>
                      <th className="pb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {auditLogs
                      .filter(log => Object.values(log).some(v => v.toString().toLowerCase().includes(auditSearch.toLowerCase())))
                      .map((log) => (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 text-gray-400 whitespace-nowrap">{log.date}</td>
                        <td className="py-3 text-white font-medium">{log.user}</td>
                        <td className="py-3">
                          <span className="text-xs uppercase bg-white/5 px-2 py-1 rounded text-gray-300 border border-white/10">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 text-gray-300">{log.targetUser}</td>
                        <td className="py-3 text-gray-400">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
