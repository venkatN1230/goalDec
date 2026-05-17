"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Target, Users, Settings, LogOut, ChevronRight, PieChart, CheckSquare, Zap, Shield, User, Briefcase } from "lucide-react";
import { useRole, Role } from "@/lib/RoleContext";
import Link from "next/link";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { role, setRole } = useRole();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/", roles: ['EMPLOYEE', 'MANAGER', 'ADMIN'] },
    { name: "Goal Sheet", icon: Target, path: "/goals/create", roles: ['EMPLOYEE'] },
    { name: "My Check-ins", icon: PieChart, path: "/check-ins", roles: ['EMPLOYEE'] },
    { name: "Team Approvals", icon: CheckSquare, path: "/approvals", roles: ['MANAGER'] },
    { name: "Manager Check-ins", icon: Users, path: "/check-ins/manager", roles: ['MANAGER'] },
    { name: "Admin Console", icon: Shield, path: "/admin", roles: ['ADMIN'] },
    { name: "Reports & Audit", icon: PieChart, path: "/admin/reports", roles: ['ADMIN'] },
    { name: "Org Analytics", icon: Target, path: "/analytics", roles: ['ADMIN', 'MANAGER'] },
    { name: "Settings", icon: Settings, path: "#", roles: ['EMPLOYEE', 'MANAGER', 'ADMIN'] },
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <motion.div
      initial={{ width: 260 }}
      animate={{ width: isExpanded ? 260 : 80 }}
      className="h-screen bg-black/30 backdrop-blur-xl border-r border-white/5 flex flex-col relative transition-all duration-300"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary rounded-lg p-2">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {isExpanded && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-white tracking-wide"
          >
            GoalSync <span className="text-primary-light">AI</span>
          </motion.span>
        )}
      </div>

      <div className="flex-1 px-4 py-4 space-y-2">
        {visibleMenuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isExpanded && (
                <span className="font-medium text-sm flex-1">{item.name}</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-white/5 space-y-4">
        {/* Hackathon Role Switcher */}
        {isExpanded && (
          <div className="bg-navy-900 rounded-lg p-2 border border-white/10 text-xs">
            <div className="text-gray-500 font-semibold mb-2 px-1 uppercase tracking-wider text-[10px]">Demo Mode: Role Switcher</div>
            <div className="flex gap-1 bg-navy-800 p-1 rounded-md">
              {(['EMPLOYEE', 'MANAGER', 'ADMIN'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-1 rounded transition-colors ${role === r ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
                  title={r}
                >
                  {r === 'EMPLOYEE' && <User className="w-3 h-3 mx-auto" />}
                  {r === 'MANAGER' && <Briefcase className="w-3 h-3 mx-auto" />}
                  {r === 'ADMIN' && <Shield className="w-3 h-3 mx-auto" />}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer text-gray-400 hover:bg-white/5 hover:text-white transition-all">
          <LogOut className="w-5 h-5" />
          {isExpanded && <span className="font-medium text-sm">Sign Out</span>}
        </div>
      </div>
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 bg-navy-700 border border-white/10 rounded-full p-1 hover:bg-navy-600 z-10"
      >
        <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    </motion.div>
  );
}
