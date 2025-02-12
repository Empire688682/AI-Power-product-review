"use client";
import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/Component/LoadingSpinner/LoadingSpinner";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("Emailtoken");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false)
  const [data, setData] = useState({
    password: "",
    confirmPassword: ""
  });

  const handleOnchange = (e) =>{
    const {name, value} = e.target;
    setData((prev)=>({...prev, [name]:value}))
  }

  const resetPassword = async () =>{
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("token", token);
    formData.append("username", username);
    try {
      setLoading(true)
        const response = await axios.post("api/auth/resetPassword", {formData});
        if(response.data.success){
          alert("Password changed successful");
        }
    } catch (error) {
        console.log("Error resetingPwd:", error);
        setErrorMsg(error.message);
    }
    finally{
      setLoading(true);
    }
  }

  function handleFormSubmission (e){
    e.preventDefault();
    if(data.password.length < 8){
        alert("Password too short");
        return
    }
    if(data.password !== data.confirmPassword){
        alert("Password did not match");
        return
    };
    resetPassword();
  }

  return (
    <div className={styles.resetPassword}>
      <div className={styles.card}>
        <h2 className={styles.title}>Reset Your Password</h2>
        <p className={styles.subtitle}>
          Please enter your new password below.
        </p>
        <form className={styles.form} onSubmit={handleFormSubmission}>
          <label htmlFor="password" className={styles.label}>
            New Password
          </label>
          <input
            type="password"
            name="password"
            className={styles.input}
            onChange={handleOnchange}
            placeholder="Enter new password"
            required
            value={data.password}
          />
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleOnchange}
            className={styles.input}
            placeholder="Confirm new password"
            required
            value={data.confirmPassword}
          />
          <button type="submit" className={styles.button}>
            {
              loading ? (
                <LoadingSpinner />
              ) : (
                "Reset Password"
              )
            }
          </button>
          {
            errorMsg && (
              <p>{errorMsg}</p>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
