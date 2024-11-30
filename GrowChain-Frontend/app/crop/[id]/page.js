"use client";
import Crop from "@/components/Crop/Crop";
import ParentContainer from "@/components/Layout/ParentContainer";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const CropDetail = () => {
  const crop = useParams().id;
  return (
    <div>
      <ParentContainer>
        <Crop />
      </ParentContainer>
    </div>
  );
};

export default CropDetail;
