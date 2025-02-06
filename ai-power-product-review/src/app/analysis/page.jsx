"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./Analyzer.module.css";
import axios from "axios";

const Analyzer = () => {
  const [reviewText, setReviewText] = useState({
    text: "",
});
  const [analysisResult, setAnalysisResult] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (reviewText.text.trim() === "") {
      alert("Please enter a review to analyze.");
      return;
    };
    const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    try {
      setLoading(true);
      const response = await axios.post(`api/allData/analyzer`, reviewText, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        let sentimentResult = "Neutral";
        if (response.data.data.score < 0) {
          sentimentResult = "Negative";
        } else if (response.data.data.score > 0) {
          sentimentResult = "Positive";
        }
        let maxConfidence = response.data.data.score * 10;
        if(maxConfidence > 100){
          maxConfidence = 95;
        }
        setAnalysisResult({
          sentiment: sentimentResult,
          confidence: maxConfidence + "%",
          keywords: response.data.data.words,
        });
        setReviewText({ text: "" });
        setTimeout(() => {
          setAnalysisResult(null);
        }, 10000); 
      }
    } catch (error) {
      console.log("Error:", error);
      setError("An error occurred while analyzing the review. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputOnchange = (e) => {
    const { value, name } = e.target;
    setReviewText((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={style.container}>
      {/* Header with Back Button */}
      <div className={style.header}>
        <button className={style.backBtn} onClick={() => router.push("/")}>
          ← Back to Home
        </button>
        <h1>Review Sentiment Analyzer</h1>
      </div>

      {/* Input Section */}
      <div className={style.analyzerBox}>
        <textarea
          className={style.inputArea}
          placeholder="Paste a review here..."
          value={reviewText.text}
          name="text"
          onChange={handleInputOnchange}
        />
        <button
          disabled={!reviewText.text}
          className={style.analyzeBtn}
          onClick={handleAnalyze}
        >
          {loading ? "Analyzing ......" : "Analyze Sentiment"}
        </button>
        {error && <p className="error">{error}</p>}
      </div>

      {/* Results Section */}
      {analysisResult && (
        <div className={style.resultsArea}>
          <h2>Analysis Results</h2>
          <p>
            <strong>Sentiment:</strong> {analysisResult.sentiment}
          </p>
          <p>
            <strong>Confidence:</strong> {analysisResult.confidence}
          </p>
          <p>
            <strong>Key Keywords:</strong> {analysisResult.keywords.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
