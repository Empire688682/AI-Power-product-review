"use client";
import React, { useState } from 'react';
import style from "./NavBar.module.css";
import SignupForm from '../SignupForm/SignupForm';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={style.navbar}>
      <div className={style.logo}>
        <h1>AI-Power Review Analyzer</h1>
      </div>
      
      <div className={style.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`${style.navLinks} ${isOpen ? style.active : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/analysis">Analysis</a></li>
        <li><a href="/about">About</a></li>
        <li><button className={style.signupBtn} onClick={()=>setShowSignup(true)}>Sign Up</button></li>
      </ul>
      <div  className={style.signupContent}>
        {
            showSignup && (
                <SignupForm setShowSignup={setShowSignup} showSignup={showSignup} />
            )
        }
      </div>
    </nav>
  );
};

export default NavBar;