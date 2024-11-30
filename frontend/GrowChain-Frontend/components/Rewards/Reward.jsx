"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Reward = () => {
  const [rewards, setRewards] = useState([
    { id: 1, description: "Reward for Sustainable Farming Practices", amount: "50 ETH", isClaimed: false },
    { id: 2, description: "Eco-Friendly Crop Management Bonus", amount: "30 ETH", isClaimed: false },
    { id: 3, description: "Community Support Recognition", amount: "20 ETH", isClaimed: true },
    { id: 4, description: "Community Support Recognition", amount: "20 ETH", isClaimed: true },
    { id: 5, description: "Reward for Sustainable Farming Practices", amount: "50 ETH", isClaimed: false },
    { id: 6, description: "Eco-Friendly Crop Management Bonus", amount: "30 ETH", isClaimed: false },
    { id: 7, description: "Community Support Recognition", amount: "20 ETH", isClaimed: true },

  ]);

  const { t } = useTranslation();

  const handleClaim = (id) => {
    setRewards((prevRewards) =>
      prevRewards.map((reward) =>
        reward.id === id ? { ...reward, isClaimed: true } : reward
      )
    );
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        {t("Your_Pending_Rewards")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className={`p-6 bg-white border flex flex-col justify-between ${
              reward.isClaimed ? "border-gray-300" : "border-secondary"
            } rounded-lg shadow-lg ${
              reward.isClaimed ? "opacity-60" : "opacity-100"
            }`}
          >
            <div>
              <h2 className="text-xl font-semibold text-primary">
                {reward.description}
              </h2>
              <p className="text-gray-600 mt-2">{reward.amount}</p>
            </div>
            <button
              onClick={() => handleClaim(reward.id)}
              className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold shadow-lg w-full ${
                reward.isClaimed
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-reward hover:bg-primary"
              }`}
              disabled={reward.isClaimed}
            >
              {reward.isClaimed ? t("claimed") : t("claim_now")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reward;
