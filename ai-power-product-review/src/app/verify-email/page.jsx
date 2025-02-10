"use client";
import React, { useEffect } from 'react';
import style from "./VerifyEmail.module.css";
import { useSearchParams } from 'next/navigation';
import axios from "axios";
import { useRouter } from 'next/navigation';

const Page = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    const verifyEmail = async () =>{
        try {
        const response = await axios.post("api/auth/verifyemail", {token});
        if(response.data.success){
            console.log("Response:", response);
            router.push("/userAnalysis");
        }
        } catch (error) {
            console.log("ErrorVerify token:", error);
        }
    }

    useEffect(()=>{
        verifyEmail()
    },[])
  return (
    <div className={style.verifyEmail}>
     <button onClick={verifyEmail}>
        <h1>Verify</h1>
     </button>
    </div>
  )
}

export default Page
