"use client";
import AOS from "aos";
import { Banana } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Card({ data }) {
  const router = useRouter();
  let map = {
    Wheat:
      "https://img.freepik.com/free-photo/beautiful-shot-whet-field-with-cloudy-sky_181624-26320.jpg",
    Corn: "/assets/Images/crops.jpg",
    Ragi: "https://www.agrifarming.in/wp-content/uploads/Guide-to-Finger-Millet-Cultivation-2.jpg",
    Millet: "https://www.zettafarms.com/wp-content/uploads/2024/01/blog-7.jpg",
    Barley:
      "https://images.pexels.com/photos/29021995/pexels-photo-29021995/free-photo-of-scenic-barley-field-under-vibrant-blue-sky.png?auto=compress&cs=tinysrgb&dpr=1&w=500",
      Apple:"/assets/Images/apple.png",
      Banana:"/assets/Images/banana.png",
      Kiwi:"/assets/Images/kiwi.png",
      Litchi:"/assets/Images/litchi.png"
  };
  useEffect(() => {
    AOS.init({ duration: 400 });
  }, []);

  return (
    <div
      className="bg-white p-8 rounded-2xl cursor-pointer"
      data-aos="fade-up"
      onClick={() => router.push(`/crop/${data}`)}
    >      
      <img
        src={map[data]}
        alt=""
        className="rounded-xl w-full h-[300px] object-cover"
      />
      <div className="pt-6 flex justify-between gap-3 items-center">
        <div className="flex-1">
          <p className="text-lg">{data} Crops</p>
          <p className="text-slate-500 text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            obcaecati voluptates veniam sed, quae vitae tempora excepturi
            dolorum porro similique.
          </p>
        </div>
        <p className="text-secondary w-fit h-fit bg-slate-200 rounded-full px-3 py-1">
          12 Points
        </p>
      </div>
    </div>
  );
}

export default Card;
