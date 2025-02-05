import React from "react";
import style from "./page.module.css";
import Home from "@/Component/Home/Home";

const page = () => {
  return (
    <div className={style.page}>
      <Home />
    </div>
  );
};

export default page;
