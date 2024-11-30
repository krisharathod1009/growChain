"use client";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { TransactionContext } from "../context/context";
import { ethers } from "ethers";

// Sample data to simulate MongoDB approvals with sustainability factors
const sampleApprovals = [
  {
    _id: "1",
    farmerAddress: "0x1234...abcd",
    requestedAmount: "1 ETH",
    sustainabilityFactors: ["Water Conservation", "Pesticide Reduction"],
  },
  {
    _id: "2",
    farmerAddress: "0x5678...efgh",
    requestedAmount: "0.5 ETH",
    sustainabilityFactors: ["Crop Rotation", "Soil Health Improvement"],
  },
  {
    _id: "3",
    farmerAddress: "0x9abc...ijkl",
    requestedAmount: "2 ETH",
    sustainabilityFactors: ["Biodiversity Support", "Organic Fertilizers"],
  },
];

const shortenAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Mock function to simulate fetching data from an API (replace with actual API call)
const fetchApprovalsFromDB = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleApprovals), 1000);
  });
};

const AdminApprovals = () => {
  const [approvals, setApprovals] = useState([]);
  const { ownerBalance, fetchOwnerBalance, provideReward } =
    useContext(TransactionContext);

  useEffect(() => {
    const fetchApprovals = async () => {
      const data = await fetchApprovalsFromDB();
      setApprovals(data);
      await fetchOwnerBalance();
    };

    fetchApprovals();
  }, [fetchOwnerBalance]);

  const handleAcceptReward = async (approvalId) => {
    try {
      await provideReward();
      toast.success("Reward approved successfully!");

      // Remove the approval from the state after it has been approved
      setApprovals((prevApprovals) =>
        prevApprovals.filter((approval) => approval._id !== approvalId)
      );
    } catch (error) {
      toast.error("Failed to approve reward");
      console.error("Reward approval failed", error);
    }
  };

  return (
    <div className="container mx-auto p-6 w-1/2">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Admin Approvals
      </h1>

      {/* Wallet Balance Display */}
      <div className="mb-8 p-4 bg-green-100 rounded-lg shadow-lg flex justify-between items-center">
        <span className="font-medium text-green-700">
          Owner&apos;s Wallet Balance
        </span>
        <span className="font-semibold text-lg text-green-800">
          {ownerBalance
            ? `${parseFloat(ethers.utils.formatEther(ownerBalance)).toFixed(
                4
              )} ETH`
            : "Loading..."}
        </span>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {approvals.length > 0 ? (
          approvals.map((approval) => (
            <div
              key={approval._id}
              className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-green-700">
                    Farmer Address: {shortenAddress(approval.farmerAddress)}
                  </h2>
                  <p className="text-green-600 text-sm">
                    Reward Committed:{" "}
                    <span className="animate-pulse text-green-700">
                      {approval.requestedAmount}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleAcceptReward(approval._id)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Approve Reward
                </button>
              </div>

              {/* Sustainability Factors Display */}
              <div className="mt-3">
                <h3 className="text-green-700 font-semibold">
                  Sustainability Factors:
                </h3>
                <ul className="list-disc pl-5 text-green-600">
                  {approval.sustainabilityFactors.map((factor, index) => (
                    <li key={index} className="text-sm">
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-green-600">No pending approvals at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AdminApprovals;
