import Advertisements from "@/components/Advertisements/Advertisements";
import Guidelines from "@/components/Guidelines/Guidelines";
import ParentContainer from "@/components/Layout/ParentContainer";
import React from "react";

const page = () => {
  return (
    <div>
      <ParentContainer>
        <Guidelines />
        {/* <Advertisements /> */}
      </ParentContainer>
    </div>
  );
};

export default page;
