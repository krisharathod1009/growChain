import React from "react";
import Image from "next/image";
import { CirclePlus } from "lucide-react";

const ExpertList = () => {
  return (
    <div className="bg-white rounded-xl border p-8 flex flex-col gap-7 h-fit w-[300px]">
      <p className="text-secondary font-semibold">Experts in agriculture</p>
      {[1, 2, 3, 4, 5].map((tab, i) => (
        <div key={i} className="flex gap-4">
          <div>
            <img
              src="/assets/Images/farmer.jpg"
              alt=""
              className="w-10 h-10 cursor-pointer rounded-full object-cover"
            ></img>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="font-semibold">Rakesh Tikait</p>
            <p className="text-sm text-slate-400">Expert</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpertList;
