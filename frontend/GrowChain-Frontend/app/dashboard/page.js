import Dashboard from "@/components/Dashboard/Dashboard";
import ParentContainer from "@/components/Layout/ParentContainer";
import React from "react";

function page() {
  return (
    <div>
      <ParentContainer>
        <Dashboard />
      </ParentContainer>
    </div>
  );
}

export default page;
