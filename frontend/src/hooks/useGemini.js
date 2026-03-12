import { useState } from 'react';
import axios from 'axios';

export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeNews = async (text) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/analyze', { text });
      setAnalysis(response.data);
      return response.data;
    } catch (error) {
      console.error("Analysis failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const callGemini = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/analyze', { text: prompt });
      setAnalysis(response.data);
      return response.data;
    } catch (error) {
      console.error("Gemini call failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { analyzeNews, callGemini, analysis, loading };
};