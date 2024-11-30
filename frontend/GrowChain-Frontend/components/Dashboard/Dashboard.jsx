"use client";
import React, { useEffect, useState } from "react";
import SustanibilityGraph from "./SustanibilityGraph";
import DoughnutChart from "./DoughnutChart";
import { CloudRain, Droplets, Thermometer, ThermometerSun } from "lucide-react";
import TokenEarningsBreakdown from "./TokenEarningsBreakdown";
import AOS from "aos";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { getCookie } from "cookies-next";

function Dashboard() {
  const [weatherData, setWeatherData] = useState();
  const userData = JSON.parse(getCookie("userData"));
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const { t } = useTranslation();
  const [averageHydration, setAverageHydration] = useState();
  const [averageQuality, setAverageQuality] = useState();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Error getting location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 400 });

    const getWeatherData = async () => {
      try {
        if (location.latitude) {
          const response = await axios.get(
            `https://api.tomorrow.io/v4/weather/forecast?location=${location.latitude},${location.longitude}&apikey=OZarZjsufUBQ7oCi2hQxEghfJhNhb30H`
          );
          setWeatherData(response.data.timelines.daily[1].values);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getWeatherData();
  }, [location]);

  useEffect(() => {
    const getSustainbilityData = async () => {
      try {
          const response = await axios.get(
            `http://localhost:5000/api/farms/get-sustainibility/`+userData._id
          );

          if(response.data){
            setAverageQuality(response.data.map((item) => item.averageQuality));
            setAverageHydration(response.data.map((item) => item.averageHydration));
          }
          

      } catch (error) {
        toast.error(error.message);
      }
    };
    getSustainbilityData();
  }, [])
  

  return (
    <div className="p-6 w-full flex flex-col gap-7">
      {/* New Weather Information Boxes */}
      <div className="flex gap-7">
        <div
          data-aos="fade-right"
          className="bg-white w-full rounded-xl p-6 flex flex-col justify-between"
        >
          <ThermometerSun size={30} />
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">
                +{weatherData?.temperatureAvg ?? 0}°C
              </div>
              <p className="text-lg">{t("temperature")}</p>
            </div>
            <div className="mt-2 border border-black rounded-full px-3 py-1">
              Good
            </div>
          </div>
        </div>
        <div
          data-aos="fade-down"
          className="bg-white w-full rounded-xl p-6 flex flex-col justify-between"
        >
          <Droplets size={30} />
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">
                {weatherData?.precipitationProbabilityAvg ?? 0}%
              </div>
              <p className="text-lg">{t("soil_moisture")}</p>
            </div>
            <div className="mt-2 border border-black rounded-full px-3 py-1">
              Low
            </div>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="bg-white w-full rounded-xl p-6 flex flex-col justify-between"
        >
          <CloudRain size={30} />
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">
                {weatherData?.precipitationProbabilityAvg ?? 0}mm
              </div>
              <p className="text-lg">{t("percipitation")}</p>
            </div>
            <div className="mt-2 border border-black rounded-full px-3 py-1">
              Low
            </div>
          </div>
        </div>
      </div>

      {/* Existing Graphs Section */}
      <div className="flex gap-7">
        <div className="bg-white rounded-xl p-8 flex-1 w-full h-[450px]">
          <p>{t("Hydration Analysis")}</p>
          {averageHydration && (
            <SustanibilityGraph averageHydration={averageHydration} />
          )}
        </div>
        <div className="bg-white rounded-xl p-8 w-[400px] h-[450px] flex flex-col items-center">
          <DoughnutChart />
        </div>
      </div>
      <div className="bg-white rounded-xl p-8 w-full h-[550px]">
        <p>{t("Quality Analysis")}</p>
        {averageQuality && (
          <TokenEarningsBreakdown averageQuality={averageQuality} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
