"use client"
import React, { useState } from "react";
import style from "./SignupForm.module.css";
import { FaGoogle } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";
import { useGlobalContext } from "../Context";
import ResetPassword from "../ResetPassword/ResetPassword";

const SignupForm = ({ setShowSignup, showSignup, setIsOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formPhase, setFormPhase] = useState("signup");
  const [loading, setLoading] = useState(false);
  const { error, setError } = useGlobalContext();
  const [disableButton, setDisableButton] = useState(false);
  const [resetPwd, setResetPwd] = useState(false);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addUser = async () => {
    const baseUrl =
      formPhase === "signup" ? "api/auth/signup" : "api/auth/login";
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}`, formData);
      if (formPhase === "signup" && response.data.success) {
        setIsOpen(false);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        const userData = response.data.data;
        localStorage.setItem("userData", JSON.stringify(userData));
        setDisableButton(true);
        setShowSignup(false);
        alert("An email has been sent to you to verify your account.");
      }
      if (formPhase === "login" && response.data.success) {
        setShowSignup(false);
        setIsOpen(false);
        const userData = response.data.data;
        localStorage.setItem("userData", JSON.stringify(userData));
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const handleGoogleSignup = () => {
    // Add your Google authentication logic here
    console.log("Google signup clicked");
  };

  return (
    <div className={style.formContainer}>
      {
        resetPwd && (
          <div className={style.formWrapperForReset}>
             <span
              className={style.closeButton}
              onClick={() => setResetPwd(false)}
            >
              <LiaTimesSolid />
            </span>
            <ResetPassword/>
          </div>
        )
      }
      {
        !resetPwd && (
          <div className={style.formWrapper}>
            <span
              className={style.closeButton}
              onClick={() => setShowSignup(!showSignup)}
            >
              <LiaTimesSolid />
            </span>

            <h2 className={style.title}>
              {formPhase === "signup" ? "Sign Up" : "Sign In"}
            </h2>

            <button className={style.googleButton} onClick={handleGoogleSignup}>
              <FaGoogle className={style.googleIcon} />
              Continue with Google
            </button>

            <div className={style.divider}>
              <span>or</span>
            </div>

            <form onSubmit={handleSubmit} className={style.form}>
              {formPhase === "signup" && (
                <div className={style.inputGroup}>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleOnchange}
                    required
                    placeholder="Your username"
                    minLength="8"
                  />
                </div>
              )}
              <div className={style.inputGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnchange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className={style.inputGroup}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnchange}
                  required
                  placeholder="Your password"
                  minLength="8"
                />
              </div>

              {formPhase === "signup" && (
                <div className={style.inputGroup}>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleOnchange}
                    required
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {error && <div className={style.error}>{error}</div>}

              <button
                disabled={loading || disableButton}
                type="submit"
                className={style.submitButton}
              >
                {formPhase === "signup"
                  ? `${loading ? "Signing up..." : "Sign Up"}`
                  : `${loading ? "Signing in..." : "Sign In"}`}
              </button>
            </form>

            <p className={style.forgetPwd} onClick={() => setResetPwd(true)}>Forgot password</p>

            <p className={style.login}>
              {formPhase === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              {formPhase === "signup" ? (
                <span onClick={() => setFormPhase("login")}>Log In</span>
              ) : (
                <span onClick={() => setFormPhase("signup")}>Sign Up</span>
              )}
            </p>
          </div>
        )
      }
    </div>
  );
};

export default SignupForm;
