import React, { useState } from "react";
import style from "./SignupForm.module.css";
import { FaGoogle } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";

const SignupForm = ({ setShowSignup, showSignup, setIsOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [formPhase, setFormPhase] = useState("signup");
  const [loading, setLoading] = useState(false);

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
      if (response.data.success) {
        setShowSignup(false);
        setIsOpen(false);
        const userData = response.data.data;
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    } catch (error) {
      console.error(error);
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
            disabled={loading}
            type="submit"
            className={style.submitButton}
          >
            {formPhase === "signup"
              ? `${loading ? "Signing up..." : "Sign Up"}`
              : `${loading ? "Signing in..." : "Sign In"}`}
          </button>
        </form>

        <p className={style.terms}>
          By signing up, you agree to our <a href="/terms">Terms of Service</a>{" "}
          and <a href="/privacy">Privacy Policy</a>
        </p>

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
    </div>
  );
};

export default SignupForm;
