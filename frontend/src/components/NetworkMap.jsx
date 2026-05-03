import React from 'react';

const NetworkMap = ({ blockedRoutes = [] }) => {
  const isSuezBlocked = blockedRoutes.includes("Suez_Canal");

  const routes = [
    {
      id: 'suez-route',
      name: 'Asia-Europe via Suez',
      path: "M 120 280 Q 400 120 680 280",
      isBlocked: isSuezBlocked,
      traffic: 85,
      cost: '$2.3M',
      time: '21 days'
    },
    {
      id: 'cape-route',
      name: 'Asia-Europe via Cape',
      path: "M 120 280 Q 400 380 680 280",
      isBlocked: false,
      traffic: 45,
      cost: '$3.1M',
      time: '35 days'
    },
    {
      id: 'pacific-route',
      name: 'Asia-Americas',
      path: "M 120 280 Q 250 200 380 180",
      isBlocked: false,
      traffic: 72,
      cost: '$1.8M',
      time: '14 days'
    }
  ];

  const ports = [
    { id: 'shanghai', name: 'Shanghai', x: 120, y: 280, region: 'Asia', status: 'operational' },
    { id: 'rotterdam', name: 'Rotterdam', x: 680, y: 280, region: 'Europe', status: 'operational' },
    { id: 'losangeles', name: 'Los Angeles', x: 380, y: 180, region: 'Americas', status: 'operational' },
    { id: 'suez', name: 'Suez Canal', x: 500, y: 200, region: 'MENA', status: isSuezBlocked ? 'blocked' : 'operational' },
    { id: 'singapore', name: 'Singapore', x: 200, y: 320, region: 'Asia', status: 'operational' }
  ];

  const getPortStatusColor = (status) => {
    switch (status) {
      case 'operational': return '#059669'; // Emerald-600 (Darker, non-neon)
      case 'blocked': return '#dc2626'; // Red-600
      case 'warning': return '#d97706'; // Amber-600
      default: return '#475569'; // Slate-600
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-slate-100 flex flex-col font-sans">
      {/* Map Controls - Enterprise Style */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 surface-3d rounded-lg">
        <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors border-b border-slate-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
      </div>

      {/* Main SVG Map */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
        <div className="absolute inset-x-20 top-6 h-20 bg-indigo-200/10 blur-3xl pointer-events-none" />
        {/* Subtle grid pattern for professional look */}
        <div className="absolute inset-0 z-0 opacity-[0.4]" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <svg viewBox="0 0 800 400" className="w-full h-full max-h-[400px] z-10 drop-shadow-[0_8px_14px_rgba(15,23,42,0.16)]">
          <defs>
            {/* Removed Glow Filters for clean look */}
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Shipping Routes */}
          {routes.map((route) => (
            <g key={route.id}>
              {/* Route Path - Solid & Professional */}
              <path
                d={route.path}
                fill="none"
                stroke={route.isBlocked ? '#fee2e2' : '#e2e8f0'} // Light red or light slate background
                strokeWidth="6"
                strokeLinecap="round"
              />
              
              {/* Main Route Line */}
              <path
                d={route.path}
                fill="none"
                stroke={route.isBlocked ? '#dc2626' : '#64748b'} // Red-600 or Slate-500
                strokeWidth="2"
                strokeDasharray={route.isBlocked ? "4, 4" : "0"}
                strokeLinecap="round"
                className="transition-colors duration-500"
              />
              
              {/* Simple Flow Indicator (Non-neon) */}
              {!route.isBlocked && (
                 <circle r="3" fill="#0f172a">
                   <animateMotion dur="6s" repeatCount="indefinite" path={route.path} />
                 </circle>
              )}
            </g>
          ))}

          {/* Ports */}
          {ports.map((port) => (
            <g key={port.id}>
              {/* Port Circle - Clean */}
              <circle
                cx={port.x}
                cy={port.y}
                r="6"
                fill="white"
                stroke={getPortStatusColor(port.status)}
                strokeWidth="2"
              />
              
              {/* Inner Dot */}
              <circle
                cx={port.x}
                cy={port.y}
                r="2"
                fill={getPortStatusColor(port.status)}
              />
              
              {/* Port Labels - High Contrast */}
              <text
                x={port.x}
                y={port.y - 12}
                fill="#1e293b" // Slate-900
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                className="font-sans"
                style={{ textShadow: '0 1px 2px white' }}
              >
                {port.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Route Status Panel - Table Style */}
      <div className="bg-white/80 backdrop-blur border-t border-slate-200">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-2 font-semibold">Route Segment</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                    <th className="px-4 py-2 font-semibold">Load</th>
                    <th className="px-4 py-2 font-semibold">Cost Est.</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
            {routes.map((route) => (
                <tr key={route.id} className="hover:bg-slate-50 transition-colors text-sm">
                    <td className="px-4 py-2 font-medium text-slate-900 border-r border-slate-100">
                        {route.name}
                    </td>
                    <td className="px-4 py-2">
                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold border rounded-sm ${
                             route.isBlocked 
                             ? 'bg-red-50 text-red-700 border-red-200' 
                             : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                            {route.isBlocked ? 'HALTED' : 'ACTIVE'}
                        </span>
                    </td>
                    <td className="px-4 py-2 font-mono text-slate-600">
                        {route.traffic}%
                    </td>
                    <td className="px-4 py-2 font-mono text-slate-600">
                        {route.cost}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default NetworkMap;