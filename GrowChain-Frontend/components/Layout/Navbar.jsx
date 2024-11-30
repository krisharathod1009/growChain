"use client";
import { tabsStore } from "@/store/tabStore";
import { userStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../translation/i18n";
import { getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

function Navbar() {
  const setTab = tabsStore((state) => state.setTab);
  const [user, setUser] = useState();
  const [language, setLanguage] = useState("en");
  const router = useRouter();

  useEffect(()=>{
    setUser(JSON.parse(getCookie("userData")));
  },[])

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="border h-[70px] top-0 bg-white flex justify-end items-center z-40">

      <button onClick={() => {
        if(language === "en"){
          setLanguage("hi");
          changeLanguage("hi");
        }else{
          setLanguage("en");
          changeLanguage("en");
        }
      }}
      className="border border-secondary rounded-xl w-[80px] py-1 mr-4"
      >
        {language === "en" ? "हिंदी" : "English"}
      </button>
      <div className="mr-14 flex gap-5">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setTab("Profile");
            router.push("/profile");
          }}
        >
          <img
            src={`/assets/Images/farmerIcon.png`}
            alt=""
            className="w-12 h-12 rounded-full"
          ></img>
          {/* <div className="bg-orange-500 w-10 h-10 rounded-full"></div> */}
          <p className="text-lg">
            {user?.fname} {user?.lname}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
