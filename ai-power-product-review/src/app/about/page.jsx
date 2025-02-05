import React from "react";
import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.aboutContainer}>
      <section className={style.headerSection}>
        <h1>About AI-Power Review Analyzer</h1>
        <p className={style.subtitle}>
          Transforming the way you understand customer feedback
        </p>
      </section>

      <section className={style.mainContent}>
        <div className={style.infoCard}>
          <h2>Our Mission</h2>
          <p>
            We strive to empower businesses with AI-driven insights from
            customer reviews, helping them make data-driven decisions and
            improve customer satisfaction.
          </p>
        </div>

        <div className={style.featuresGrid}>
          <div className={style.featureCard}>
            <h3>Smart Analysis</h3>
            <p>
              Utilizing advanced AI algorithms to analyze customer reviews and
              extract meaningful patterns and insights.
            </p>
          </div>

          <div className={style.featureCard}>
            <h3>Real-Time Processing</h3>
            <p>
              Get instant analysis of your customer feedback, allowing for quick
              response to customer needs and concerns.
            </p>
          </div>

          <div className={style.featureCard}>
            <h3>Accurate Results</h3>
            <p>
              Our AI models are trained on vast amounts of data to ensure highly
              accurate and reliable analysis results.
            </p>
          </div>

          <div className={style.featureCard}>
            <h3>Easy Integration</h3>
            <p>
              Seamlessly integrate our analysis tools with your existing systems
              and workflow.
            </p>
          </div>
        </div>

        <div className={style.contactSection}>
          <h2>Get in Touch</h2>
          <p>Have questions about our service? We'd love to hear from you!</p>
          <button className={style.contactBtn}>Contact Us</button>
        </div>
      </section>
    </div>
  );
};

export default About;
