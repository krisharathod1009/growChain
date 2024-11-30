"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Role = () => {
  const router = useRouter();
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/assets/Images/background.jpg")' }} // Update the URL for your background image
    >
      {/* Container for cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 max-w-4xl">
        {/* Donor Card */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Donor
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Support farmers by donating resources and help them thrive.
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="px-10 py-2 bg-blue-400 text-white rounded-full  hover:bg-blue-600 shadow-md"
              onClick={() => {
                router.push("/donor");
              }}
            >
              Select
            </button>
          </div>
        </div>

        {/* Farmer Card */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Farmer
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Connect with donors to receive resources and grow your farm.
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="px-10 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md"
              onClick={() => {
                router.push("/register");
              }}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
