import Register from "@/components/auth/Register";
import { isLoggedIn } from "@/lib/isLoggedIn";
import React from "react";

function Page() {
  isLoggedIn();
  return <Register />;
}

export default Page;
