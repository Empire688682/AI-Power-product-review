"use client";
import React, { useEffect, useState } from "react";
import style from "./UserAnalysis.module.css";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "@/Component/Context";
import Image from "next/image";
import axios from "axios";
import PieChart from "@/Component/Charts/PieChart";
import BarChart from "@/Component/Charts/BarChart";

const UserAnalysis = () => {
  const { user } = useGlobalContext();
  const [selectedChart, setSelectedChart] = useState("bar");
  const [image, setImage] = useState("");
  const [savedImage, setSavedImage] = useState("");
   const [analysisResult, setAnalysisResult] = useState(null);
  const [sentimentData, setSentimentData] = useState({
    positive: 3,
    negative: 0,
    neutral: 14,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const clientImage = localStorage.getItem("ClientImage");
      if (clientImage && clientImage !== "undefined") {
        setSavedImage(JSON.parse(clientImage));
      }
    }
  }, []);

  useEffect(() => {
    if (image) {
      edditImage();
    }
  }, [image]);

  useEffect(()=>{
    setAnalysisResult({
      sentiment: "Positive",
      confidence: 70 + "%",
      keywords: ["goood", "awsome", "perfect", "awsome"],
    });
  },[])

  const edditImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("userId", user._id);
      const response = await axios.post("api/profileImage", formData);
      if (response.data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "ClientImage",
            JSON.stringify(response.data.imageUrl),
          );
        }
        window.location.reload();
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.containerHeader}>
        <Image
          className={style.userImg}
          src={savedImage ? `${savedImage}` : "/avatar_icon.png"}
          alt="IMG"
          width={50}
          height={50}
        />
        <label htmlFor="image">
          <p>Change image</p>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          id="image"
          hidden
        />
        <h1>
          <FaHeart className={style.icon} />
          {user.username} Analysis
        </h1>
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
              <strong>Key Keywords:</strong> {analysisResult.keywords.join(", ")}
            </p>
          </div>
          <div className={style.chartResult}>
            <h2>Charts Results</h2>
            {
              totalWords && (
                <span>Total Words{totalWords}</span>
              )
            }
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

export default UserAnalysis;
