'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, Download, ShieldAlert, ShieldCheck, 
  ChevronRight, ArrowLeft, BarChart2, Shield, Settings, 
  HelpCircle, LogOut, Filter, FileSpreadsheet, Trash2
} from 'lucide-react';
import Link from 'next/link';

// Seed initial mock database logs
const INITIAL_RECORDS = [
  { id: "LUM-9831", name: "Sarah Connor", income: 7500, score: 780, loan: 150, riskScore: 12, riskLevel: "Low", status: "Approved" },
  { id: "LUM-9832", name: "Marcus Wright", income: 4200, score: 610, loan: 200, riskScore: 78, riskLevel: "High", status: "Rejected" },
  { id: "LUM-9833", name: "John Connor", income: 9800, score: 810, loan: 350, riskScore: 8, riskLevel: "Low", status: "Approved" },
  { id: "LUM-9834", name: "Kyle Reese", income: 3800, score: 660, loan: 80, riskScore: 32, riskLevel: "Low", status: "Approved" },
  { id: "LUM-9835", name: "Ellen Ripley", income: 8200, score: 710, loan: 450, riskScore: 55, riskLevel: "Medium", status: "Rejected" },
  { id: "LUM-9836", name: "Peter Parker", income: 3100, score: 580, loan: 120, riskScore: 88, riskLevel: "High", status: "Rejected" },
  { id: "LUM-9837", name: "Bruce Wayne", income: 25000, score: 840, loan: 650, riskScore: 6, riskLevel: "Low", status: "Approved" },
  { id: "LUM-9838", name: "Clark Kent", income: 5500, score: 740, loan: 180, riskScore: 18, riskLevel: "Low", status: "Approved" },
  { id: "LUM-9839", name: "Diana Prince", income: 12000, score: 790, loan: 300, riskScore: 10, riskLevel: "Low", status: "Approved" },
  { id: "LUM-9840", name: "Tony Stark", income: 24000, score: 820, loan: 700, riskScore: 15, riskLevel: "Low", status: "Approved" },
  { id: "LUM-9841", name: "Natasha Romanoff", income: 6800, score: 680, loan: 220, riskScore: 42, riskLevel: "Medium", status: "Approved" },
  { id: "LUM-9842", name: "Steve Rogers", income: 4900, score: 730, loan: 140, riskScore: 22, riskLevel: "Low", status: "Approved" }
];

export default function AdminAuditPanel() {
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('All'); // 'All' | 'Low' | 'Medium' | 'High'
  const [adminSection, setAdminSection] = useState('database'); // 'database' | 'settings' | 'alerts'

  // Filtering Logic
  const filteredRecords = records.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.loan.toString().includes(searchQuery) ||
                          r.score.toString().includes(searchQuery);
                          
    const matchesRisk = selectedRiskFilter === 'All' || r.riskLevel === selectedRiskFilter;
    
    return matchesSearch && matchesRisk;
  });

  // Count helper functions
  const countLow = records.filter(r => r.riskLevel === 'Low').length;
  const countMedium = records.filter(r => r.riskLevel === 'Medium').length;
  const countHigh = records.filter(r => r.riskLevel === 'High').length;

  // CSV Exporter
  const exportToCSV = () => {
    const headers = ["Applicant ID", "Name", "Monthly Income", "Credit Score", "Loan Amount ($k)", "Risk Score", "Risk Level", "Underwriting Decision"];
    const rows = filteredRecords.map(r => [
      r.id, r.name, r.income, r.score, r.loan, r.riskScore, r.riskLevel, r.status
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `luminate_underwriting_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Row Delete (simulating management)
  const handleDeleteRow = (id) => {
    setRecords(records.filter(r => r.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-brand-black text-white flex flex-col lg:flex-row">
      <div className="bg-mesh-glow"></div>
      
      {/* 1. Left Admin Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-brand-card/90 lg:min-h-screen border-r border-brand-border px-6 py-8 flex flex-col justify-between z-10 relative">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-extrabold font-outfit tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-purple bg-clip-text text-transparent">
              Luminate.
            </h1>
            <span className="text-[10px] text-brand-purple uppercase tracking-widest font-bold block mt-1">Admin Audit Hub</span>
          </div>

          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setAdminSection('database')}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                adminSection === 'database'
                  ? 'bg-brand-purple/15 text-white border border-brand-purple/20 shadow-glow'
                  : 'text-brand-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4 text-brand-purple" />
              Underwriting Records
            </button>
            
            <button
              onClick={() => setAdminSection('alerts')}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                adminSection === 'alerts'
                  ? 'bg-brand-purple/15 text-white border border-brand-purple/20 shadow-glow'
                  : 'text-brand-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Shield className="w-4 h-4 text-brand-indigo" />
              Risk Limits & Alarms
            </button>

            <button
              onClick={() => setAdminSection('settings')}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                adminSection === 'settings'
                  ? 'bg-brand-purple/15 text-white border border-brand-purple/20 shadow-glow'
                  : 'text-brand-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4 text-brand-muted" />
              Portal Configurations
            </button>
          </nav>
        </div>

        <div className="pt-8 border-t border-brand-border/60 flex flex-col gap-4 mt-8 lg:mt-0">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#111115] hover:bg-[#181822] border border-brand-border hover:border-brand-purple/30 text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Underwriting Workspace
          </Link>
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-purple to-brand-indigo flex items-center justify-center font-bold text-xs font-outfit text-white">
              SU
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">Security Operator</p>
              <span className="text-[9px] text-brand-muted mt-0.5 block leading-none">Auth Role: Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Database Content Area */}
      <main className="flex-grow p-6 md:p-10 lg:p-12 z-10 relative overflow-x-hidden">
        
        <AnimatePresence mode="wait">
          {adminSection === 'database' && (
            <motion.div
              key="database"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              
              {/* Header HUD */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-outfit text-white flex items-center gap-2 mb-0 before:hidden">
                    Underwriting Records Audit
                  </h2>
                  <p className="text-xs text-brand-muted mt-1">Review, filter, and export credit risk logs classified by the KNN machine learning engine.</p>
                </div>

                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-[#b975ff] hover:to-[#7477ff] rounded-xl text-xs font-semibold font-outfit shadow-glowAccent hover:scale-[1.01] transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Export Data as CSV
                </button>
              </div>

              {/* Filtering Controls Bar */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Live Search */}
                <div className="md:col-span-6 relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 h-4 text-brand-muted" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search applicant name, ID, score, or metrics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0C0C0E]/90 border border-brand-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-brand-purple outline-none text-white placeholder:text-brand-muted"
                  />
                </div>

                {/* Risk Filter Tabs */}
                <div className="md:col-span-6 flex items-center justify-start md:justify-end gap-1.5 overflow-x-auto py-1">
                  {[
                    { label: 'All', count: records.length, style: 'text-white' },
                    { label: 'Low', count: countLow, style: 'text-risk-low' },
                    { label: 'Medium', count: countMedium, style: 'text-risk-medium' },
                    { label: 'High', count: countHigh, style: 'text-risk-high' }
                  ].map(tab => (
                    <button
                      key={tab.label}
                      onClick={() => setSelectedRiskFilter(tab.label)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all ${
                        selectedRiskFilter === tab.label
                          ? 'bg-brand-purple/10 border-brand-purple/35 text-white shadow-glow'
                          : 'bg-[#0C0C0E]/50 border-brand-border/60 text-brand-muted hover:text-white'
                      }`}
                    >
                      <span className={tab.style}>{tab.label} Risk</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-[#1c1c22] text-[10px] text-brand-muted font-bold">
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

              </div>

              {/* Data Table */}
              <div className="glass-card rounded-2xl border border-brand-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#111115] border-b border-brand-border">
                        <th className="py-4 px-6 text-xs font-bold text-brand-muted uppercase tracking-wider">Applicant ID</th>
                        <th className="py-4 px-6 text-xs font-bold text-brand-muted uppercase tracking-wider">Name</th>
                        <th className="py-4 px-6 text-xs font-bold text-brand-muted uppercase tracking-wider">Income</th>
                        <th className="py-4 px-6 text-xs font-bold text-brand-muted uppercase tracking-wider">Credit Score</th>
                        <th className="py-4 px-6 text-xs font-bold text-brand-muted uppercase tracking-wider">Loan Size</th>
                        <th className="py-4 px-6 text-xs font-bold text-brand-muted uppercase tracking-wider">AI Risk Score</th>
                        <th className="py-4 px-6 text-xs font-bold text-brand-muted uppercase tracking-wider">Risk Level</th>
                        <th className="py-4 px-6 text-xs font-bold text-brand-muted uppercase tracking-wider">Decision</th>
                        <th className="py-4 px-6 text-xs font-bold text-brand-muted uppercase tracking-wider text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/40">
                      <AnimatePresence>
                        {filteredRecords.map(r => (
                          <motion.tr
                            key={r.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            layout
                            className="hover:bg-white/[0.015] transition-all"
                          >
                            <td className="py-3.5 px-6 font-mono text-xs text-brand-indigo font-semibold">{r.id}</td>
                            <td className="py-3.5 px-6 font-semibold text-white">{r.name}</td>
                            <td className="py-3.5 px-6 text-xs text-brand-muted">${r.income.toLocaleString()}/mo</td>
                            <td className="py-3.5 px-6 text-xs font-medium font-outfit">{r.score}</td>
                            <td className="py-3.5 px-6 text-xs font-outfit">${r.loan}k</td>
                            <td className="py-3.5 px-6 text-xs font-bold font-outfit">{r.riskScore}</td>
                            <td className="py-3.5 px-6">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                r.riskLevel === 'Low' ? 'text-risk-low bg-risk-low/5 border border-risk-low/10' :
                                r.riskLevel === 'Medium' ? 'text-risk-medium bg-risk-medium/5 border border-risk-medium/10' :
                                'text-risk-high bg-risk-high/5 border border-risk-high/10'
                              }`}>
                                {r.riskLevel}
                              </span>
                            </td>
                            <td className="py-3.5 px-6">
                              <span className={`flex items-center gap-1 text-xs font-bold ${
                                r.status === 'Approved' ? 'text-risk-low' : 'text-risk-high'
                              }`}>
                                {r.status === 'Approved' ? (
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                ) : (
                                  <ShieldAlert className="w-3.5 h-3.5" />
                                )}
                                {r.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-center">
                              <button
                                onClick={() => handleDeleteRow(r.id)}
                                className="p-1.5 text-brand-muted hover:text-risk-high hover:bg-risk-high/5 rounded-lg transition-all"
                                title="Remove log record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                      {filteredRecords.length === 0 && (
                        <tr>
                          <td colSpan="9" className="py-12 text-center text-brand-muted text-xs">
                            No underwriting audit records matching search criteria or risk selections.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          )}

          {adminSection === 'alerts' && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold font-outfit text-white before:hidden">Risk Limits & Alarms</h2>
                <p className="text-xs text-brand-muted mt-1">Configure automated underwriting restrictions and default trigger values.</p>
              </div>
              <div className="glass-card rounded-2xl p-6 border border-brand-border max-w-xl space-y-6">
                <div className="flex justify-between items-center border-b border-brand-border pb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Auto-Rejection Threshold</h4>
                    <p className="text-xs text-brand-muted">Instantly deny applicants exceeding this risk rating.</p>
                  </div>
                  <span className="text-sm font-bold text-brand-purple font-outfit">Risk &gt; 70</span>
                </div>
                <div className="flex justify-between items-center border-b border-brand-border pb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">High Debt-to-Income Flag</h4>
                    <p className="text-xs text-brand-muted">Trigger manual audit review warning if loan-to-income exceeds index.</p>
                  </div>
                  <span className="text-sm font-bold text-brand-purple font-outfit">Ratio &gt; 4.5x</span>
                </div>
                <div className="flex justify-between items-center border-b border-brand-border pb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Credit Verification Block</h4>
                    <p className="text-xs text-brand-muted">Automatically lock evaluation if borrower history conforms to guidelines defaults.</p>
                  </div>
                  <span className="text-xs font-bold text-risk-low uppercase">ENABLED</span>
                </div>
              </div>
            </motion.div>
          )}

          {adminSection === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold font-outfit text-white before:hidden">Portal Configurations</h2>
                <p className="text-xs text-brand-muted mt-1">Manage API routing parameters, server ports, and security metadata keys.</p>
              </div>
              <div className="glass-card rounded-2xl p-6 border border-brand-border max-w-xl space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-brand-muted uppercase">FastAPI Core URL Path</label>
                  <input
                    type="text"
                    defaultValue="https://luminate-ai-loan-prediction-backend.vercel.app"
                    className="w-full bg-[#111115] border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-indigo font-semibold outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-brand-muted uppercase">Classification Engine Mode</label>
                  <select className="w-full bg-[#111115] border border-brand-border rounded-xl px-4 py-2.5 text-xs outline-none">
                    <option>KNN Classifier (Joblib Fit)</option>
                    <option>Logistic Regression (Joblib Fit)</option>
                    <option>Rules-based Emulated Fallback</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
