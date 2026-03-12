import React, { useState, useEffect } from 'react';
import './Solver.css';

const SolverDashboard = ({ latestDisruptions }) => {
  const [solverResult, setSolverResult] = useState(null);
  const [blocked, setBlocked] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSolver = async (manualBlocks) => {
    setIsSimulating(true);
    const routesToBlock = manualBlocks || blocked;
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const response = await fetch('http://localhost:8000/api/solver/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocked_routes: routesToBlock }),
    });
    const data = await response.json();
    setSolverResult(data);
    setIsSimulating(false);
  };

  return (
    <div className="h-full flex flex-col bg-white border border-slate-200 rounded-sm shadow-sm">
      <div className="p-4 border-b border-slate-200 custom-pattern">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
           <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
           Optimization Engine
        </h3>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Scenario Controls</h4>
            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => { setBlocked(["Suez_Canal"]); runSolver(["Suez_Canal"]); }} 
                    disabled={isSimulating}
                    className="w-full py-2 px-4 bg-white border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded font-medium text-sm transition-colors text-left flex items-center justify-between group"
                >
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                        Simulate Suez Blockage
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                
                <button 
                    onClick={() => { setBlocked([]); runSolver([]); }} 
                    disabled={isSimulating}
                    className="w-full py-2 px-4 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 rounded font-medium text-sm transition-colors text-left flex items-center justify-between"
                >
                    <span>Reset Parameters</span>
                </button>
            </div>
        </div>

        {isSimulating ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <span className="text-xs font-mono uppercase tracking-widest">Calculating optimal routes...</span>
            </div>
        ) : solverResult ? (
            <div className="animate-fade-in">
            {/* Metric Card */}
            <div className="mb-6 bg-slate-50 border border-slate-200 rounded p-4 flex justify-between items-end">
                <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Projected Cost</h4>
                    <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block mb-1">
                        ✓ Optimal Solution Found
                    </span>
                </div>
                <div className="text-2xl font-mono font-bold text-slate-800">
                    ${solverResult.total_cost.toLocaleString()}
                </div>
            </div>

            {/* Allocation Table */}
            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 flex justify-between">
                    <span>Resource Allocation</span>
                    <span>Units</span>
                </h4>
                <div className="space-y-3">
                {Object.entries(solverResult.allocations).map(([route, units]) => (
                <div key={route} className="group">
                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                        <span className="truncate pr-4">{route.replace(/_/g, ' ')}</span>
                        <span className="font-mono text-slate-900">{units}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                            className="bg-slate-600 h-1.5 rounded-full transition-all duration-500 group-hover:bg-blue-600" 
                            style={{ width: `${(units / 800) * 100}%` }}
                        ></div>
                    </div>
                </div>
                ))}
                </div>
            </div>
            </div>
        ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center p-8 text-slate-300 border-2 border-dashed border-slate-100 rounded">
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium">Ready for Simulation</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default SolverDashboard;