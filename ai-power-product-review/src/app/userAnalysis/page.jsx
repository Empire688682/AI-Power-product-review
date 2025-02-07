"use client";
import React, { useEffect, useState } from "react";
import style from "./UserAnalysis.module.css";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "@/Component/Context";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

const UserAnalysis = () => {
  const { user } = useGlobalContext();
  const [selectedChart, setSelectedChart] = useState("bar");
  const [image, setImage] = useState("");
  console.log("image:", image);

  useEffect(() => {
    if (user.image) {
      setImage(user.image);
    }
  }, [user]);

  const edditImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("userId", user._id);
      const response = await axios.post("/api/profileImaga", formData);
      if (response.data.success) {
        window.location.reload();
        if (typeof window !== "undefined") {
          localStorage.setItem("userData", JSON.stringify(response.data.data));
        }
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  useEffect(()=>{
    if(image){
      edditImage();
    }
  },[image])

  return (
    <div className={style.container}>
      <div className={style.containerHeader}>
        <label className={style.imgCon} htmlFor="image">
          <Image className={style.userImg} src={image ? `/images/${image}` : "/avatar_icon.png"} alt="IMG" width={50} height={50} />
          <IoIosArrowDown className={style.userEditIcon} />
        </label>
        <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} name="" id="image" hidden />
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
