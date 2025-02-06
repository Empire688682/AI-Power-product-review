"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./Analyzer.module.css";
import axios from "axios";

const Analyzer = () => {
  const [reviewText, setReviewText] = useState({
    data: "",
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const router = useRouter();

  const handleAnalyze = async () => {
    if (reviewText.data.trim() === "") {
      alert("Please enter a review to analyze.");
      return;
    }

    try {
      const response = await axios.post("api/allData/analyzer", reviewText, {
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        console.log("FResponse:", response);
      }
    } catch (error) {
      console.log("Error:", error);
    }

    setAnalysisResult({
      sentiment: "Positive",
      confidence: "87%",
      keywords: ["Great", "Amazing", "Recommend"],
    });
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
          value={reviewText.data}
          name="data"
          onChange={handleInputOnchange}
        />
        <button
          disabled={!reviewText.data}
          className={style.analyzeBtn}
          onClick={handleAnalyze}
        >
          Analyze Sentiment
        </button>
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
