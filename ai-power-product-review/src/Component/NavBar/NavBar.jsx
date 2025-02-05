"use client";
import React, { useState } from 'react';
import style from "./NavBar.module.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <li><button className={style.signupBtn}>Sign Up</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;