"use client";
import React, { useEffect, useState } from "react";
import style from "./UserAnalysis.module.css";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "@/Component/Context";
import Image from "next/image";
import axios from "axios";

const UserAnalysis = () => {
  const { user } = useGlobalContext();
  const [selectedChart, setSelectedChart] = useState("bar");
  const [image, setImage] = useState("");

  const [savedImage, setSavedImage] = useState("");

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

  const edditImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("userId", user._id);
      const response = await axios.post("/api/profileImage", formData);
      if (response.data.success) {
        if(typeof window !== "undefined"){
          localStorage.setItem("ClientImage", JSON.stringify(response.data.imageUrl ))
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
      <Image className={style.userImg} src={savedImage ? `${savedImage}` : "/avatar_icon.png"} alt="IMG" width={50} height={50} />
        <label htmlFor="image">
        <p>Change image</p>
        </label>
        <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} id="image" hidden />
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
