"use client";
import React, { useContext } from "react";
import Lottie from "lottie-react";
import animationData from "../public/assets/Lottie/LandingLottie.json";
import { TransactionContext } from "@/components/context/context";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userStore } from "@/store/userStore";
import {
  getCookies,
  setCookie,
} from "cookies-next/client";

const Landing = () => {
  const { connectWallet } = useContext(TransactionContext);
const setUser = userStore((state) => state.setUser);
  const router = useRouter();
  const handleLogin = async () => {
    let currentAccount = await connectWallet();    

    try {      
      const response = await axios.get(`http://localhost:5000/api/farmers/${currentAccount}`);

      setCookie('address',currentAccount);
      if (response?.data || response?.data?.length !== 0) {
        router.push("/feed");
        setCookie("userData", JSON.stringify(response.data));
      } else if (response.status === 404) {
        router.push("/role");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      {/* Lottie Animation */}
      <div className="w-[500px] h-[500px]">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold mt-5">
        Welcome to <span className="text-green-500">Grow</span>Chain
      </h1>
      <p className="text-lg mt-4 text-gray-500 px-48 text-center">
        Farm sustainability meets innovation! Track your water conservation,
        pesticide usage, and crop cycles with ease, all while earning exciting
        rewards for going green. 🌾💧 Let’s make farming sustainable and
        profitable—because when the Earth wins, you win too! 🌍💚
      </p>

      {/* Get Started Button */}
      <button
        // onClick={() => {
        //   connectWallet();
        //   router.push("/role");
        // }}
        onClick={handleLogin}
        className="mt-6 px-24 py-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-full text-xl font-semibold text-white shadow-lg"
      >
        Get Started
      </button>
    </div>
  );
};

export default Landing;
