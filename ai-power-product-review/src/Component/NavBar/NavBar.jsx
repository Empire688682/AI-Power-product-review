"use client";
import React, { use, useEffect, useState } from "react";
import style from "./NavBar.module.css";
import SignupForm from "../SignupForm/SignupForm";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [pathname, setPthname] = useState("home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    if (showSignup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showSignup]);

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

      <ul className={`${style.navLinks} ${isOpen ? style.active : ""}`}>
        <Link
        
          style={{ textDecoration: "none" }}
          className={pathname === "home" ? `${style.active}` : `${style.menu}`}
          href="/"
          onClick={() => {setPthname("home"); toggleMenu();}}
        >
          Home
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className={
            pathname === "analysis" ? `${style.active}` : `${style.menu}`
          }
          href="/analysis"
          onClick={() => {setPthname("analysis"); toggleMenu();}}
        >
          Analysis
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className={pathname === "about" ? `${style.active}` : `${style.menu}`}
          href="/about"
          onClick={() => {setPthname("about");toggleMenu();}}
        >
          About
        </Link>
        <li>
          <button
            className={style.signupBtn}
            onClick={() => {setShowSignup(true);toggleMenu();}}
          >
            Sign Up
          </button>
        </li>
      </ul>
      {showSignup && (
        <SignupForm setShowSignup={setShowSignup} showSignup={showSignup} />
      )}
    </nav>
  );
};

export default NavBar;
