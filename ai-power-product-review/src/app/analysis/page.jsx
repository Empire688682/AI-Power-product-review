"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./Analyzer.module.css";
import axios from "axios";
import PieChart from "@/Component/Charts/PieChart";
import BarChart from "@/Component/Charts/BarChart";
import LineChart from "@/Component/Charts/LineChart";
import { useGlobalContext } from "@/Component/Context";
import { FaHeart } from "react-icons/fa";

const Analyzer = () => {
  const [reviewText, setReviewText] = useState({
    text: "",
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedChart, setSelectedChart] = useState("bar");
  const [sentimentData, setSentimentData] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [button, setButton] = useState("post");
  const [totalWords, setTotalWords] = useState("");
  const { user } = useGlobalContext();

  const handleAnalyze = async () => {
    if (reviewText.text.trim() === "") {
      alert("Please enter a review to analyze.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`api/allData/analyzer`, reviewText, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        const data = response.data.data;

        // Add checks to avoid accessing undefined values
        const totalLength = data.tokens ? data.tokens.length : 0;
        const positiveLength = data.positive ? data.positive.length : 0;
        const negativeLength = data.negative ? data.negative.length : 0;
        const neutralLength = totalLength - positiveLength - negativeLength;

        setTotalWords(totalLength);

        setSentimentData({
          positive: positiveLength,
          negative: negativeLength,
          neutral: neutralLength,
        });

        let sentimentResult = "Neutral";
        if (data.score < 0) {
          sentimentResult = "Negative";
        } else if (data.score > 0) {
          sentimentResult = "Positive";
        }

        let maxConfidence = data.score * 10;
        if (maxConfidence > 100) {
          maxConfidence = 95;
        }

        setAnalysisResult({
          sentiment: sentimentResult,
          confidence: maxConfidence + "%",
          keywords: data.words || [],
        });

        setButton("reset");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during analysis.");
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
      {
        user._id &&
        <div className={style.userSection}>
          <h2><FaHeart className={style.icon} /> {user.username} <FaHeart className={style.icon} /></h2>
        </div>
      }
      <div className={style.header}>
        <button className={style.backBtn} onClick={() => router.push("/")}>
          ← Back to Home
        </button>
        <h1>Review Sentiment Analyzer</h1>
      </div>

      <div className={style.chartSelector}>
        <label htmlFor="chartType">Select Chart Type:</label>
        <select
          id="chartType"
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="line">Line Chart</option>
        </select>
      </div>

      {/* Input Section */}
      <div className={style.analyzerBox}>
        <textarea
          className={style.inputArea}
          placeholder="Paste a review here..."
          value={reviewText.text}
          name="text"
          onChange={handleInputOnchange}
          id="textArea"
        />
        {button === "post" ? (
          <button
            className={style.primaryBtn}
            onClick={handleAnalyze}
            disabled={loading || reviewText.text.trim() === ""}
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
        )}
        {error && <p className="error">{error}</p>}
      </div>

      {/* Results Section */}
      {analysisResult && (
        <div className={style.resultsArea}>
          <div className={style.plainResul}>
            <h2>Analysis Results</h2>
            <p>
              <strong>Sentiment:</strong> {analysisResult.sentiment}
            </p>
            <p>
              <strong>Confidence:</strong> {analysisResult.confidence}
            </p>
            <p>
              <strong>Key Keywords:</strong>{" "}
              {analysisResult.keywords.join(", ")}
            </p>
          </div>
          <div className={style.chartResult}>
            <h2>Charts Results</h2>
            {totalWords && <span>Total Words: {totalWords}</span>}
            <div className={style.chartCards}>
              {selectedChart === "pie" && (
                <div className={style.chartCard}>
                  <PieChart data={sentimentData} />
                </div>
              )}
              {selectedChart === "bar" && (
                <div className={style.chartCard}>
                  <BarChart data={sentimentData} />
                </div>
              )}
              {selectedChart === "line" && (
                <div className={style.chartCard}>
                  <LineChart data={sentimentData} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
