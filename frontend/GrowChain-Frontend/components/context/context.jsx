"use client";
import React, { createContext, useState, useEffect } from "react";
import { contractAbi, contractAddress } from "../utils/constants";
import toast from "react-hot-toast";
// import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [owner, setOwner] = useState("");
  const [ownerBalance, setOwnerBalance] = useState("");

  // Helper function to get the contract instance
  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractAbi, signer);
  };

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const { ethereum } = window;
        if (!ethereum) return alert("Please install MetaMask!");
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // toast.success("Wallet Connected Successfully");
        setCurrentAccount(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error("Wallet connection failed", error);
        toast.error("Unable to connect the wallet");
        throw new Error("No Ethereum account found");
      }
    }
  };

  const fetchContractDetails = async () => {
    try {
      const contract = getContract();
      const contractOwner = await contract.admin();
      setOwner(contractOwner);
      setIsOwner(contractOwner.toLowerCase() === currentAccount.toLowerCase());
    } catch (error) {
      console.error("Error fetching contract details:", error);
      toast.error("Failed to fetch contract details");
    }
  };

  const provideReward = async () => {
    try {
      const contract = getContract();
      const tx = await contract.provideReward(currentAccount, {
        value: ethers.utils.parseEther("1"),
      });
      await tx.wait();
      toast.success("Reward sent successfully!");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
  };

  const donateAmount = async (donationAmount) => {
    try {
      const contract = getContract();
      // console.log(owner);
      const tx = await contract.donate({
        value: ethers.utils.parseEther(donationAmount),
      });
      await tx.wait();
      toast.success("Donation sent successfully!");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
  };

  const trackProgress = async (activityHash) => {
    try {
      const contract = getContract();
      await contract.trackPractice(activityHash);
      toast.success("Progress tracked successfully!");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
  };

  const deletePreviousProgress = async (activityHash) => {
    try {
      const contract = getContract();
      await contract.clearDailyActivities();
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
  };

  const fetchOwnerBalance = async () => {
    try {
      const contract = getContract();
      const ownerBalance = await contract.contractBalance();
      setOwnerBalance(ownerBalance);
      // console.log("Owner's balance fetched successfully");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("Transaction error:", error);
    }
  };

  // useEffect(() => {
  //   const init = async () => {
  //     const { ethereum } = window;
  //     if (ethereum) {
  //       window.ethereum.on("chainChanged", () => {
  //         window.location.reload();
  //       });

  //       window.ethereum.on("accountsChanged", () => {
  //         window.location.reload();
  //       });
  //       const accounts = await ethereum.request({ method: "eth_accounts" });
  //       if (accounts.length) setCurrentAccount(accounts[0]);
  //     }
  //   };
  //   init();
  // }, []);

  useEffect(() => {
    if (currentAccount) {
      toast.success("Wallet Connected Successfully");
    }
  }, [currentAccount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        provideReward,
        currentAccount,
        trackProgress,
        fetchContractDetails,
        isOwner,
        setIsOwner,
        donateAmount,
        owner,
        fetchOwnerBalance,
        ownerBalance,
        deletePreviousProgress,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
