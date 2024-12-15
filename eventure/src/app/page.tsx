"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EventList from "@/components/Event/EventList";
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
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow pt-16">
          <EventList />
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}