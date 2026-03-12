import React from 'react';
import { AlertTriangle, Clock, Ship } from 'lucide-react';

const AnalysisCard = ({ data, loading }) => {
  if (loading) return <div className="p-6 animate-pulse bg-slate-800 rounded-xl">AI is analyzing disruption...</div>;
  if (!data) return null;

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl shadow-2xl text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className={data.impact_score > 5 ? "text-red-500" : "text-yellow-500"} />
          AI Intelligence Report
        </h2>
        <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono">
          Score: {data.impact_score}/10
        </span>
      </div>
      
      <p className="text-slate-400 mb-6 italic">"{data.summary}"</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-3 rounded-lg">
          <label className="text-[10px] uppercase text-slate-500">Node</label>
          <p className="font-semibold text-blue-400">{data.affected_node}</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg">
          <label className="text-[10px] uppercase text-slate-500">Delay</label>
          <p className="font-semibold text-orange-400">{data.delay_estimate_days} Days</p>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
        <p className="text-sm font-medium text-blue-200">Recommended Action: {data.recommendation}</p>
      </div>
    </div>
  );
};

export default AnalysisCard;