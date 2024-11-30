"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaLeaf, FaTint, FaSeedling } from "react-icons/fa";

// Function to map quality score to category
const mapQualityToCategory = (quality) => {
  if (quality >= 85) return "Excellent";
  if (quality >= 70) return "Superior";
  if (quality >= 55) return "Prime";
  if (quality >= 40) return "Good";
  if (quality >= 20) return "Fair";
  return "Poor";
};

const RecommendationsCard = ({ crop }) => {
  const { t } = useTranslation();
  const date = new Date(crop.date);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  let map = {
    Wheat:
      "https://img.freepik.com/free-photo/beautiful-shot-whet-field-with-cloudy-sky_181624-26320.jpg",
    Corn: "/assets/Images/crops.jpg",
    Ragi: "https://www.agrifarming.in/wp-content/uploads/Guide-to-Finger-Millet-Cultivation-2.jpg",
    Millet: "https://www.zettafarms.com/wp-content/uploads/2024/01/blog-7.jpg",
    Barley:
      "https://images.pexels.com/photos/29021995/pexels-photo-29021995/free-photo-of-scenic-barley-field-under-vibrant-blue-sky.png?auto=compress&cs=tinysrgb&dpr=1&w=500",
    Apple: "/assets/Images/apple.png",
    Banana: "/assets/Images/banana.png",
    Kiwi: "/assets/Images/kiwi.png",
    Litchi: "/assets/Images/litchi.png",
  };

  return (
    <div style={styles.card}>
      <div
        style={{ ...styles.header, backgroundImage: `url(${map[crop.crop]})` }}
      >
        <div style={styles.overlay}>
          <h2 style={styles.cardTitle}>{crop.crop}</h2>
        </div>
      </div>
      <div style={styles.infoRow}>
        <span>{t("quality")}:</span>{" "}
        <span>{mapQualityToCategory(crop.quality)}</span>
      </div>
      <div style={styles.infoRow}>
        <span>{t("moisture")}:</span> <span>{crop.moisture}</span>
      </div>
      <div style={styles.infoRow}>
        <span>{t("fertilizer")}:</span> <span>{crop.fertilizer}</span>
      </div>
      <div style={styles.infoRow}>
        <span>{t("date")}:</span> <span>{formattedDate}</span>
      </div>
      <div style={styles.recommendation}>
        <FaLeaf/>
        <span style={{ marginLeft: "8px" }}>{crop.desc}</span>
      </div>
    </div>
  );
};

const Recommendations = () => {
  const [cropsData,setCropsData] = useState();
  const userData = JSON.parse(getCookie("userData"));
  useEffect(() => {
    const getRecommendedData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/activity/farmer/" + userData._id
        );

        setCropsData(response.data);
        console.log(response.data);
        
      } catch (error) {
        toast.error("Something went wrong!")
      }
    };
    getRecommendedData();
  }, []);

  return (
    <div style={styles.container} className="grid-cols-4">
      {cropsData && cropsData.map((crop, index) => (
        <RecommendationsCard key={index} crop={crop} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    padding: "30px",
    gap: "30px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    width: "280px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.2s",
  },
  header: {
    position: "relative",
    height: "120px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    display: "flex",
    alignItems: "flex-end",
  },
  overlay: {
    width: "100%",
    padding: "10px",
    background: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 20px",
    color: "#555",
  },
  recommendation: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
};

export default Recommendations;
