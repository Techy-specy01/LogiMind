import React, { useState, useEffect } from 'react';
import './App.css';
import IntelligenceFeed from './components/IntelligenceFeed';
import NetworkMap from './components/NetworkMap';
import SolverControls from './components/SolverControls';

const App = () => {
  const [blockedRoutes, setBlockedRoutes] = useState([]);
  const [solverData, setSolverData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-800 font-sans">
      {/* Top Navigation Bar - Premium Enterprise Header */}
      <header className="bg-white/95 border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-slate-900 leading-tight">LogiMind</h1>
              <p className="text-xs text-slate-500 font-medium">Global Intelligence Command Center</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center ml-8 gap-1">
            <a href="#" className="px-3 py-1.5 text-sm font-medium text-slate-900 bg-slate-100 rounded-md">Dashboard</a>
            <a href="#" className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md">Network</a>
            <a href="#" className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md">Analytics</a>
            <a href="#" className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md">Reports</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right">
             <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block">
               SYSTEM ONLINE
             </div>
             <p className="text-xs font-mono text-slate-500 mt-0.5">
               {currentTime.toISOString().split('T')[0]} <span className="text-slate-300">|</span> {currentTime.toLocaleTimeString('en-US', { hour12: false })} UTC
             </p>
          </div>
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          <button className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
             <span className="sr-only">User</span>
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6 max-w-[1920px] mx-auto">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="surface-3d lift-3d rounded-xl px-4 py-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Active Shipments</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">24,381</p>
          </div>
          <div className="surface-3d lift-3d rounded-xl px-4 py-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Global Nodes</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">197 Ports</p>
          </div>
          <div className="surface-3d lift-3d rounded-xl px-4 py-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">AI Decisions Today</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">1,942</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Intelligence Feed */}
          <section className="col-span-12 xl:col-span-3 lg:col-span-4 flex flex-col gap-4">
             <div className="surface-3d rounded-xl overflow-hidden flex flex-col h-[600px] lg:h-[calc(100vh-12rem)]">
               <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                 <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Live Intelligence</h2>
                 <span className="text-xs font-medium text-slate-500">Real-time Feed</span>
               </div>
               <IntelligenceFeed onDisruptionDetected={(route) => setBlockedRoutes([route])} />
             </div>
          </section>

          {/* MIDDLE COLUMN: Network & Analytics */}
          <section className="col-span-12 xl:col-span-6 lg:col-span-8 flex flex-col gap-6">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <MetricCard
                label="Global Network Status" 
                value="98.2%" 
                subtext="Operational Uptime"
                trend="stable"
              />
               <MetricCard 
                label="Current Throughput" 
                value="14.2k" 
                subtext="TEU / Hour"
                trend="up"
                trendValue="+5.4%"
              />
               <MetricCard 
                label="Risk Index" 
                value="Low" 
                subtext="No major threats"
                trend="down"
                highlight={true}
              />
            </div>

            {/* Main Map Panel */}
            <div className="surface-3d rounded-xl overflow-hidden flex-1 min-h-[400px]">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                 <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Global Logistics Map</h2>
                 <div className="flex gap-2">
                   <button className="text-xs bg-white border border-slate-200 px-2.5 py-1.5 rounded-md text-slate-600 hover:bg-slate-50 transition-colors">Filter View</button>
                   <button className="text-xs bg-white border border-slate-200 px-2.5 py-1.5 rounded-md text-slate-600 hover:bg-slate-50 transition-colors">Export Image</button>
                 </div>
              </div>
              <div className="h-full w-full bg-slate-100 relative">
                 <NetworkMap blockedRoutes={blockedRoutes} />
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Solver/Controls */}
          <section className="col-span-12 xl:col-span-3 lg:col-span-12 flex flex-col">
             <div className="surface-3d rounded-xl overflow-hidden h-full">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                   <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Optimization Engine</h2>
                </div>
                <SolverControls 
                  blockedRoutes={blockedRoutes} 
                  setSolverData={setSolverData} 
                  solverData={solverData}
                />
             </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Simplified, clean Metric Card
const MetricCard = ({ label, value, subtext, trend, trendValue, highlight }) => {
  return (
    <div className={`surface-3d rounded-xl p-4 flex flex-col justify-between ${highlight ? 'border-l-4 border-l-emerald-500' : ''}`}>
      <div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">{label}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">{value}</span>
          {trendValue && (
            <span className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-700' : 'text-danger'}`}>
              {trendValue}
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 text-xs text-slate-400 font-medium">
        {subtext}
      </div>
    </div>
  );
};

export default App;
