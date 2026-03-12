import React, { useState, useEffect } from 'react';

const IntelligenceFeed = () => {
  const [intel, setIntel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIntel = async () => {
    try {
      // Ensure this matches your FastAPI port (default 8000)
      const response = await fetch('http://localhost:8000/api/intelligence');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setIntel(data.intel);
      setLoading(false);
    } catch (err) {
      setError("Failed to connect to Intelligence Engine");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntel();
    const interval = setInterval(fetchIntel, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-white">Initializing Neural Feed...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="feed-container">
      <div className="feed-header">
        <div className="pulse-icon"></div>
        <h2>LIVE LOGISTICS INTELLIGENCE</h2>
      </div>

      <div className="scroll-area">
        {intel.map((item) => (
          <div key={item.id} className={`intel-card ${item.severity.toLowerCase()}`}>
            <div className="card-top">
              <span className="source-tag">{item.source}</span>
              <span className="time-tag">{new Date(item.published_at).toLocaleTimeString()}</span>
            </div>
            <h3>{item.headline}</h3>
            <p>{item.summary ? item.summary.substring(0, 120) + "..." : "No description available."}</p>
            <div className="card-footer">
              <span className="severity-badge">{item.severity} Impact</span>
              {item.trigger_solver && <span className="solver-hint">READY FOR SOLVER</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntelligenceFeed;