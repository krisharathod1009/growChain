"use client";

import React from "react";
import { Sprout } from "lucide-react";
import { useTranslation } from "react-i18next";

const Guidelines = () => {
  const {t} = useTranslation();
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        {t("guideline_1")}
      </h1>

      <ul className="space-y-4 text-lg text-gray-800">
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          {t("guideline_2")}
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          {t("guideline_3")}
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          {t("guideline_4")}
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          {t("guideline_5")}
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          {t("guideline_6")}
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          {t("guideline_7")}
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          {t("guideline_8")}
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          {t("guideline_9")}
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          {t("guideline_10")}
        </li>
      </ul>
    </div>
  );
};

export default Guidelines;
