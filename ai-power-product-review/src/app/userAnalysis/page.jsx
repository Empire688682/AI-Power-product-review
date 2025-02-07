"use client";
import React, { useEffect, useState } from "react";
import style from "./UserAnalysis.module.css";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "@/Component/Context";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

const UserAnalysis = () => {
  const { user } = useGlobalContext();
  const [selectedChart, setSelectedChart] = useState("bar");

  return (
    <div className={style.container}>
      <div className={style.containerHeader}>
        <div className={style.imgCon}>
        <Image className={style.userImg} src="/avatar_icon.png" alt="IMG" width={50} height={50}/>
        <IoIosArrowDown className={style.userEditIcon} />
        </div>
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
          <option value="custom">Custom Chart</option>
        </select>
      </div>

      <div className={style.chartContainer}>
        <p>
          Chart will be displayed here based on user selection ({selectedChart})
        </p>
      </div>
    </div>
  );
};

export default UserAnalysis;
