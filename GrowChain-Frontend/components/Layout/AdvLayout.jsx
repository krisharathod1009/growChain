"use client";
import React, { useEffect, useState } from "react";
import Advertisements from "../Advertisements/Advertisements";
import { getCookie } from "cookies-next";

function AdvLayout({ children }) {
  const address = getCookie("address");

  return (
    <div>
      {address && (
        <div className="">
          <Advertisements />
        </div>
      )}
      {children}
    </div>
  );
}

export default AdvLayout;
