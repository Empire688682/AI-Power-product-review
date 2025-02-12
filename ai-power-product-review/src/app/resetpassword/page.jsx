"use client";
import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("Emailtoken");
  const username = searchParams.get("username");
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
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
          setSuccessMsg("Password changed successful");
        }
    } catch (error) {
        console.log("Error resetingPwd:", error);
        alert("An error occur try again later");
    }
    finally{
      setLoading(true);
    }
  }

  function handleFormSubmission (e){
    e.preventDefault();
    if(data.password.length < 8){
        setErrorMsg("Password too short");
        return
    }
    if(data.password !== data.confirmPassword){
        setErrorMsg("Password did not match");
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
        <form className={styles.form}>
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
          <button type="submit" className={styles.button} onSubmit={handleFormSubmission}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
