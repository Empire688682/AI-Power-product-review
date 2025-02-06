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
  const [button, setButton] = useState("post");

  const handleAnalyze = async () => {
    if (reviewText.text.trim() === "") {
      alert("Please enter a review to analyze.");
      return;
    };

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
        setButton("reset");
        const clickedElement = document.getElementById("textArea").focus();
        if (clickedElement) {
          setAnalysisResult(null);
        }
      }
    } catch (error) {
      console.log("Error:", error);
      setError(()=>{
        if(error.response.data.message === "Text is too long to analyze"){
          return error.response.data.message
        }else{
          return "An error occured, try again later"
        };
      });
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

  const handleTextAreaClick = () => {
    if (analysisResult) {
      setAnalysisResult(null);
      setButton("post");
    }
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
          onClick={handleTextAreaClick}
          id="textArea"
        />
        {
          button === "post" ? (
            <button
              className={style.primaryBtn}
              onClick={handleAnalyze}
              disabled={loading || reviewText.text.trim() === "" }
            >
              {loading ? "Analyzing..." : "Analyze Review"}
            </button>
          ) : (
            <button
              className={style.secondaryBtn}
              onClick={() => {
                setReviewText({ text: "" });
                setAnalysisResult(null);
                setButton("post");
              }}
            >
              Reset
            </button>
          )
        }
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
