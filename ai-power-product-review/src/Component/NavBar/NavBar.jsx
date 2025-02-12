"use client";
import React, { use, useEffect, useState } from "react";
import style from "./NavBar.module.css";
import SignupForm from "../SignupForm/SignupForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "../Context";

const NavBar = () => {
  const { setShowSignup, showSignup, setIsOpen, isOpen } = useGlobalContext();
  const rawPathname = usePathname();
  const pathname = rawPathname === "/" ? "home" : rawPathname.replace("/", "");
  const { user, logoutUser } = useGlobalContext();

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
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className={
            pathname === "analysis" ? `${style.active}` : `${style.menu}`
          }
          href="/analysis"
          onClick={() => setIsOpen(false)}
        >
          Analysis
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className={pathname === "about" ? `${style.active}` : `${style.menu}`}
          href="/about"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        {user && (
          <Link
            style={{ textDecoration: "none" }}
            className={
              pathname === "userAnalysis" ? `${style.active}` : `${style.menu}`
            }
            href="/userAnalysis"
            onClick={() => setIsOpen(false)}
          >
            My Data
          </Link>
        )}
        <li>
          {user ? (
            <button
              className={style.signupBtn}
              onClick={() => {
                logoutUser();
                setIsOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className={style.signupBtn}
              onClick={() => {
                setShowSignup(true);
                setIsOpen(false);
              }}
            >
              Sign Up
            </button>
          )}
        </li>
      </ul>
      {showSignup && (
        <SignupForm
          setIsOpen={setIsOpen}
          setShowSignup={setShowSignup}
          showSignup={showSignup}
        />
      )}
    </nav>
  );
};

export default NavBar;
