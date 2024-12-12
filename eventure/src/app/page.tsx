import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "@/components/EventCard";
import PaginatedEvents from "@/components/PaginatedEvents";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="pt-16">
        <PaginatedEvents></PaginatedEvents>
      </div>
      <Footer></Footer>
    </>
  );
}
