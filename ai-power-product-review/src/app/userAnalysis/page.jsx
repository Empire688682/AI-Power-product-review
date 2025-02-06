"use client";
import React, { useEffect, useState } from "react";
import style from "./UserAnalysis.module.css";
import { FaHeart } from "react-icons/fa";

const UserAnalysis = () => {
  const [selectedChart, setSelectedChart] = useState("bar");
  const [user, setUser] = useState({});
  console.log(user);

  useEffect(()=>{
    if(typeof window !== "undefined"){
      setUser(JSON.parse(localStorage.getItem("userData"))) || {};
    }
  },[]);

  return (
    <div className={style.container}>
      <h1><FaHeart className={style.icon} />{user.username} Analysis</h1>
      
      <div className={style.chartSelector}>
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
      
      <div className={style.chartContainer}>
        <p>Chart will be displayed here based on user selection ({selectedChart})</p>
      </div>
    </div>
  );
};

export default UserAnalysis;
