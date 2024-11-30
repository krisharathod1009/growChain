const { cookies } = require("next/headers");
const { redirect } = require("next/navigation");

export const isLoggedIn = () => {
  const address = cookies().get("address")?.value;
  if (address) {
    redirect("/feed");
  }
};
