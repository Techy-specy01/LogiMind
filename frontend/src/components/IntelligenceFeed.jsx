import React, { useState, useEffect } from 'react';

const IntelligenceFeed = ({ onDisruptionDetected }) => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mockAlerts = [
    {
      id: 1,
      type: 'disruption',
      severity: 'high',
      source: 'SUEZ CANAL',
      title: 'Major Shipping Disruption Detected',
      description: 'Container vessel Ever Given blocking canal traffic',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      confidence: 95,
      route: 'Suez_Canal'
    },
    {
      id: 2,
      type: 'weather',
      severity: 'medium',
      source: 'PACIFIC ROUTES',
      title: 'Typhoon Warning',
      description: 'Category 3 storm approaching major shipping lanes',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      confidence: 87,
      route: null
    },
    {
      id: 3,
      type: 'economic',
      severity: 'low',
      source: 'GLOBAL MARKETS',
      title: 'Fuel Price Fluctuation',
      description: 'Brent crude oil prices up 3.2% affecting shipping costs',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      confidence: 73,
      route: null
    },
    {
      id: 4,
      type: 'security',
      severity: 'medium',
      source: 'RED SEA',
      title: 'Heightened Security Concerns',
      description: 'Increased naval presence reported in shipping corridors',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      confidence: 82,
      route: null
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-l-4 border-l-red-600 bg-red-50/50';
      case 'medium':
        return 'border-l-4 border-l-amber-500 bg-amber-50/50';
      case 'low':
        return 'border-l-4 border-l-blue-500 bg-blue-50/50';
      default:
        return 'border-l-4 border-l-slate-300 bg-slate-50/50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'disruption':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'weather':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case 'economic':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'security':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleAlertClick = (alert) => {
    if (alert.route && alert.type === 'disruption') {
      onDisruptionDetected(alert.route);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Updating feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full surface-3d rounded-xl overflow-hidden font-sans">
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Intelligence Stream
        </h3>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 rounded text-emerald-800 border border-emerald-200">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></div>
              <span className="text-[10px] font-bold tracking-tight">LIVE</span>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-white to-slate-50/50">
        {alerts.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs font-mono">-- No active alerts --</div>
        ) : (
          <div className="divide-y divide-slate-100"> 
            {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => handleAlertClick(alert)}
                className={`group p-3.5 hover:bg-white transition-colors duration-200 cursor-pointer ${getSeverityStyles(alert.severity)}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{getTypeIcon(alert.type)}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {alert.source}
                    </span>
                    {alert.type === 'disruption' && (
                       <span className="px-1.5 py-0.5 text-[9px] font-bold bg-red-100 text-red-700 rounded border border-red-200 uppercase">Critical</span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                    {formatTimeAgo(alert.timestamp)}
                  </span>
                </div>
                
                <h4 className="text-sm font-semibold text-slate-800 leading-tight mb-1 group-hover:text-blue-700 transition-colors">
                    {alert.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                    {alert.description}
                </p>

                {alert.route && (
                   <div className="mt-2 flex items-center gap-1 text-blue-600 group-hover:text-blue-700">
                      <span className="text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 border-b border-blue-200 hover:border-blue-600 transition-colors">
                        Run Optimization
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                   </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntelligenceFeed;