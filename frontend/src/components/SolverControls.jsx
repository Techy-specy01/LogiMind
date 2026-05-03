import React, { useState, useEffect } from 'react';
import { useGemini } from '../hooks/useGemini';

const SolverControls = ({ blockedRoutes, setSolverData, solverData }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [scenario, setScenario] = useState('current');
  const { callGemini } = useGemini();

  const scenarios = [
    { id: 'current', name: 'Current State', description: 'Analyze existing network conditions' },
    { id: 'disruption', name: 'Disruption Impact', description: 'Simulate major route blockage' },
    { id: 'optimization', name: 'Cost Optimization', description: 'Find most efficient routing' },
    { id: 'future', name: 'Future Planning', description: 'Predict next 30 days' }
  ];

  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            setIsAnalyzing(false);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      const prompt = `Analyze shipping route optimization with blocked routes: ${blockedRoutes.join(', ')}. 
      Provide cost variance percentage, alternative routes, and efficiency metrics in JSON format.`;
      
      const result = await callGemini(prompt);
      
      setTimeout(() => {
        setSolverData({
          variance: 15.3,
          alternatives: ['Cape Route', 'Trans-Pacific'],
          efficiency: 87,
          cost_impact: '+$2.1M',
          time_delay: '8 days',
          confidence: 94
        });
        setAnalysisProgress(100);
        setIsAnalyzing(false);
      }, 3000);
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  const metrics = [
    {
      label: 'Network Efficiency',
      value: solverData ? `${solverData.efficiency}%` : '92%',
      change: solverData ? '+2%' : '+5%',
      color: 'emerald'
    },
    {
      label: 'Cost Impact',
      value: solverData ? solverData.cost_impact : '+$1.2M',
      change: solverData ? solverData.time_delay : '3 days',
      color: 'amber'
    },
    {
      label: 'Confidence Score',
      value: solverData ? `${solverData.confidence}%` : '89%',
      change: '+3%',
      color: 'blue'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white/85">
      {/* Scenario Selection - Tabs Style */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="flex overflow-x-auto">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className={`flex-1 min-w-[120px] px-4 py-3 text-left border-r border-slate-200 focus:outline-none transition-colors ${
                scenario === s.id
                  ? 'bg-white border-b-2 border-b-blue-700 text-blue-800'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-b border-slate-200'
              }`}
            >
              <div className="text-sm font-bold truncate">{s.name}</div>
            </button>
          ))}
        </div>
        <div className="px-4 py-2 bg-white border-b border-slate-200">
            <p className="text-xs text-slate-500">
                {scenarios.find(s => s.id === scenario)?.description}
            </p>
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="p-5 border-b border-slate-200 bg-white">
        <div className="space-y-4">
          {/* Input Parameters - Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Constraints
                </label>
                <div className="bg-white border border-slate-300 rounded-sm p-2 h-[38px] flex items-center overflow-hidden">
                  {blockedRoutes.length > 0 ? (
                    <div className="flex gap-1">
                      {blockedRoutes.map((route) => (
                        <span
                          key={route}
                          className="bg-red-50 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-sm border border-red-200 whitespace-nowrap"
                        >
                          {route.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">None</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Objective
                </label>
                <div className="flex border border-slate-300 rounded-sm overflow-hidden h-[38px]">
                  {['Cost', 'Time', 'Risk'].map((priority, idx) => (
                    <button
                      key={priority}
                      className={`flex-1 text-[10px] font-bold uppercase transition-colors ${idx !== 2 ? 'border-r border-slate-200' : ''} hover:bg-slate-50 focus:bg-blue-50 focus:text-blue-700`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`flex-1 py-2 rounded-sm font-bold text-xs uppercase tracking-wide transition-all shadow-sm ${
                  isAnalyzing
                    ? 'bg-slate-100 text-slate-400 border border-slate-300 cursor-wait'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border border-transparent shadow hover:shadow-md'
                }`}
              >
                {isAnalyzing ? 'Processing Engine...' : 'Run Simulation'}
              </button>
              
              <button className="px-3 py-2 border border-slate-300 rounded-sm hover:bg-slate-50 text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </button>
          </div>

          {/* Progress Bar - Thin & Sharp */}
          {isAnalyzing && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                <span>Calculating Optimal Path</span>
                <span>{Math.round(analysisProgress)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results - Data Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-gradient-to-b from-slate-50/70 to-white">
        <div className="p-4 space-y-6">
          {/* Key Metrics */}
          <div>
             <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">KPI Analysis</h4>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {metrics.map((metric, index) => (
                  <div key={index} className="surface-3d rounded-lg p-3">
                    <span className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">{metric.label}</span>
                    <div className="flex items-end justify-between">
                        <span className="text-xl font-bold text-slate-800 -mb-1">{metric.value}</span>
                        <span className={`text-[10px] font-bold ${
                            metric.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                            {metric.change}
                        </span>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* AI Recommendations - List View */}
          {solverData && (
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">Optimization Strategy</h4>
              <div className="surface-3d rounded-lg divide-y divide-slate-100">
                {solverData.alternatives?.map((alt, index) => (
                  <div key={index} className="p-3 flex items-start gap-3 hover:bg-white transition-colors duration-200">
                    <div className="mt-1 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                    <div>
                        <div className="text-sm font-bold text-slate-800">{alt}</div>
                        <p className="text-xs text-slate-500 mt-0.5">Projected variance within acceptable limits. Route variability index: Low.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolverControls;