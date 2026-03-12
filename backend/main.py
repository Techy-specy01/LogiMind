import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Autonomous SC - Intelligence Engine")

# 1. Enable CORS for your React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Configuration (Replace with your actual key)
NEWS_API_KEY = os.getenv("NEWS_API_KEY", "YOUR_NEWS_API_KEY_HERE")

def analyze_severity(title, description):
    """Simple heuristic to flag high-impact events for the AI agent."""
    critical_terms = ["blocked", "strike", "closed", "collapsed", "fire", "closure"]
    text = (title + " " + (description or "")).lower()
    if any(term in text for term in critical_terms):
        return "High"
    return "Medium"

@app.get("/api/intelligence")
async def get_supply_chain_news():
    # 3. The "Elite" Query: Focus on Supply Chain Chokepoints
    # Keywords: Port, Strike, Storm, Suez, Panama, Freight, Logistics
    query = '(Suez OR "Panama Canal" OR Port OR Strike OR Storm) AND (Blocked OR Delay OR Closure OR Congestion)'
    
    # Fetch news from the last 2 days
    two_days_ago = (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d')
    url = f"https://newsapi.org/v2/everything?q={query}&from={two_days_ago}&sortBy=publishedAt&language=en&apiKey={NEWS_API_KEY}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if data.get("status") != "ok":
            return {"error": "NewsAPI Error", "message": data.get("message")}

        # 4. Transform into Structured Intelligence
        feed = []
        for art in data.get("articles", [])[:15]:  # Limit to top 15 for token efficiency
            feed.append({
                "id": art["url"],
                "headline": art["title"],
                "source": art["source"]["name"],
                "summary": art["description"],
                "url": art["url"],
                "severity": analyze_severity(art["title"], art["description"]),
                "published_at": art["publishedAt"],
                "trigger_solver": "High" in analyze_severity(art["title"], art["description"])
            })
            
        return {"status": "online", "count": len(feed), "intel": feed}

    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)