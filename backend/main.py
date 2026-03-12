from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.gemini_engine import analyze_news_content

app = FastAPI()

# Enable CORS so React can talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsRequest(BaseModel):
    text: str

@app.post("/analyze")
async def analyze(request: NewsRequest):
    try:
        result = analyze_news_content(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)