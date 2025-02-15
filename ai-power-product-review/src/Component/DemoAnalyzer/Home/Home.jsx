"use client";
import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import DemoAnalyzer from "../DemoAnalyzer";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/Component/Context";

const Home = () => {
  const {user, setShowSignup} = useGlobalContext();
  const [showDemo, setShowDemo] = useState(false);

  const router = useRouter();

  const handleGetStarted = () => {
    if(user._id){
      router.push("/analysis");
    }else{
      setShowSignup(true);
    }
  };

  return (
    <div className={style.container}>
      {/* Hero Section */}
      <section className={style.hero}>
        <h1>AI-Powered Review Analysis</h1>
        <p className={style.heroSubtitle}>
          Understand customer sentiment instantly with advanced AI analysis
        </p>
          <div className={style.heroButtons}>
            <button className={style.primaryBtn} onClick={handleGetStarted}>
              Get Started Free
            </button>
            <button
              className={style.secondaryBtn}
              onClick={() => setShowDemo(true)}
            >
              See Demo
            </button>
          </div>
      </section>

      {showDemo && (
        <section>
          <DemoAnalyzer setShowDemo={setShowDemo} />
        </section>
      )}

      {/* Features Section */}
      <section className={style.features}>
        <h2>Why Choose Our Analyzer</h2>
        <div className={style.featureGrid}>
          <div className={style.featureCard}>
            <h3>Instant Analysis</h3>
            <p>Get sentiment results in seconds</p>
          </div>
          <div className={style.featureCard}>
            <h3>Detailed Insights</h3>
            <p>Beyond just positive/negative - understand the nuances</p>
          </div>
          <div className={style.featureCard}>
            <h3>Batch Processing</h3>
            <p>Analyze multiple reviews at once</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
