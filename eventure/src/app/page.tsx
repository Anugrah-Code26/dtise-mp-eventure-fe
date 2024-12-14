"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "@/components/EventCard";
import PaginatedEvents from "@/components/PaginatedEvents";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session]);
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