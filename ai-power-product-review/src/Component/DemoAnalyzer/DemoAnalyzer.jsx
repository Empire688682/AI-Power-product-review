import React, { useState } from 'react';
import style from "./DemoAnalyzer.module.css";
import { LiaTimesSolid } from "react-icons/lia";

const DemoAnalyzer = ({setSeDemo}) => {
  const [demoText, setDemoText] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate analysis with example results
  const runDemo = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const demoResult = {
        sentiment: 'Positive',
        confidence: 0.89,
        keywords: ['excellent', 'helpful', 'recommend'],
        score: 4.5
      };
      setResult(demoResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className={style.demoSection}>
      <h2>Try It Out</h2>
      <p className={style.demoInstruction}>
        Paste a review or try our example to see the magic happen
      </p>
      <LiaTimesSolid className={style.icon} onClick={()=>setSeDemo(false)}/>

      <div className={style.demoContainer}>
        <div className={style.inputSection}>
          <div className={style.exampleButtons}>
            <button 
              className={style.exampleBtn}
              onClick={() => setDemoText("This product is excellent! The customer service was very helpful. I would definitely recommend it to others.")}
            >
              Load Positive Example
            </button>
            <button 
              className={style.exampleBtn}
              onClick={() => setDemoText("The product was okay, but could use some improvements. Delivery was on time though.")}
            >
              Load Neutral Example
            </button>
          </div>

          <textarea
            className={style.demoInput}
            value={demoText}
            onChange={(e) => setDemoText(e.target.value)}
            placeholder="Enter a review here or click an example above..."
          />
          <button 
            className={style.analyzeBtn}
            onClick={runDemo}
            disabled={!demoText || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
        </div>

        {result && (
          <div className={style.resultSection}>
            <div className={style.mainResult}>
              <div className={style.sentimentBadge} data-sentiment={result.sentiment.toLowerCase()}>
                {result.sentiment}
              </div>
              <div className={style.confidenceScore}>
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </div>
            </div>

            <div className={style.detailedResults}>
              <div className={style.scoreCard}>
                <h4>Review Score</h4>
                <div className={style.score}>{result.score}/5.0</div>
              </div>
              
              <div className={style.keywordsCard}>
                <h4>Key Phrases</h4>
                <div className={style.keywordTags}>
                  {result.keywords.map((keyword, index) => (
                    <span key={index} className={style.keywordTag}>
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoAnalyzer;