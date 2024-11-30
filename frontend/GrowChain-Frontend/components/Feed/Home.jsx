"use client";
import React, { useEffect, useState } from "react";
import ExpertList from "./ExpertList";
import { Search } from "lucide-react";
import Card from "./Card";
import AOS from "aos";
import { getCookie, setCookie } from "cookies-next/client";
import { useTranslation } from "react-i18next";

function Home() {
  const [user, setUser] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 400 });
    setUser(JSON.parse(getCookie("userData")));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCrops = user
    ? user.selectedCrops.filter((crop) =>
        crop.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="relative flex p-6">
      <div className="flex-1 flex flex-col gap-7 px-12 pr-20">
        <div className="bg-white flex gap-3 px-5 py-4 rounded-full">
          <Search />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            className="w-full outline-none border-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-7">
          {filteredCrops.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </div>
      </div>

      <div>
        <ExpertList />
      </div>
    </div>
  );
}

export default Home;
