import Image from "next/image";
import Landing from "../components/Landing.jsx";
import { isLoggedIn } from "@/lib/isLoggedIn.js";

export default function Home() {
  isLoggedIn();
  return (
    <div>
     <Landing/>
    </div>
  );
}
