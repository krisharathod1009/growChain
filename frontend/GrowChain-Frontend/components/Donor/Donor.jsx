"use client";
import React, { useState, useContext } from "react";
import Image from "next/image"; // Next.js Image component for optimized image rendering
import ether from "../../public/assets/Images/ether.png";
import { TransactionContext } from "../context/context";

const Donor = () => {
  const [amount, setAmount] = useState("");
  const { donateAmount } = useContext(TransactionContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-2xl">
        <h1 className="text-3xl font-bold text-green-800 text-center">
          Support Sustainability
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Your donation helps reward farmers for their sustainable practices.
        </p>

        <div className="mt-6">
          {/* Donation Amount Input */}
          <label
            htmlFor="amount"
            className="block text-gray-700 text-lg font-medium"
          >
            Enter Donation Amount (ETH)
          </label>
          <div className="relative mt-2">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 0.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Image
              src={ether}
              alt="Ethereum Logo"
              width={24}
              height={24}
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          {/* Donate Button */}
          <button
            onClick={() => donateAmount(amount)}
            className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Donate Now
          </button>
        </div>

        {/* Impact Information */}
        <div className="mt-8 bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800">
            How Your Donation Helps
          </h2>
          <ul className="mt-2 text-gray-600 list-disc list-inside">
            <li>Encourage sustainable farming practices.</li>
            <li>Provide rewards and incentives to farmers.</li>
            <li>Promote ecological balance and food security.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Donor;
