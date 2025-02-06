"use client";
import React, { useEffect, useState } from "react";
import styles from "./UserAnalysis.module.css";

const UserAnalysis = () => {
  const [selectedChart, setSelectedChart] = useState("bar");
  const [user, setUser] = useState([]);
  console.log(user);

  useEffect(()=>{
    if(typeof window !== "undefined"){
      setUser(JSON.parse(localStorage.getItem("userData")) || [])
    }
  },[])

  return (
    <div className={styles.container}>
      <h1>User Analysis History</h1>
      
      <div className={styles.chartSelector}>
        <label htmlFor="chartType">Select Chart Type:</label>
        <select
          id="chartType"
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="custom">Custom Chart</option>
        </select>
      </div>
      
      <div className={styles.chartContainer}>
        <p>Chart will be displayed here based on user selection ({selectedChart})</p>
      </div>
    </div>
  );
};

export default UserAnalysis;
