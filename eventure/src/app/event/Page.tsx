import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FC } from "react";

const Event: FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <EventCard
        thumbnail="/images/dwp.png"
        eventName="DWP"
        price="$20"
        date="December, 25"
        organizer="Event organizer"
        organizerPicture="/images/organizerPicture.png"
      ></EventCard>
      <Footer></Footer>
    </>
  );
};

export default Event;
