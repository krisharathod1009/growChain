import Role from "@/components/Role/Role";
import { isLoggedIn } from "@/lib/isLoggedIn";
import React from "react";

const page = () => {
  isLoggedIn();
  return (
    <div>
      <Role />
    </div>
  );
};

export default page;
