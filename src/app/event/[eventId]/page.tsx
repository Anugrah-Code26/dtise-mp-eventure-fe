"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getEventById, GetEventResponseDTO } from "@/api/getEvents";
import { getTickets } from "@/api/getTIckets";
import { TicketResponse } from "@/types/ticket";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DescriptionFormating from "@/components/Common/DescriptionFormating";
import TicketList from "@/components/Event/TicketList";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserCircle,
} from "react-icons/fa";
import formatDateRange from "@/utils/common/formatDateRange";

const EventPage: React.FC = () => {
  const { eventId } = useParams();
  const [activeTab, setActiveTab] = useState("desc");

  const {
    data: event,
    error,
    isLoading,
  } = useQuery<GetEventResponseDTO, Error>({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(Number(eventId)),
    enabled: !!eventId,
  });

  const {
    data: ticketsResponse,
    error: ticketsError,
    isLoading: ticketsLoading,
  } = useQuery<TicketResponse, Error>({
    queryKey: ["tickets", eventId],
    queryFn: () => getTickets(Number(eventId)),
    enabled: !!eventId,
  });

  if (isLoading || ticketsLoading) return <div>Loading...</div>;
  if (error || ticketsError)
    return <div>{error?.message || ticketsError?.message}</div>;
  if (!event || !ticketsResponse || !ticketsResponse.success)
    return <div>No event or tickets found</div>;

  const { formattedDateRange, formattedTimeRange } = formatDateRange(
    event.startedAt,
    event.endedAt
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 pt-28 pb-16 flex gap-10 w-[70%]">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[60%]">
          <div className="relative pb-10">
            <img
              src={event.thumbnail}
              alt={event.name}
              className="w-full h-auto"
              style={{ maxWidth: "1280px", maxHeight: "600px" }}
            />
          </div>

          <div className="flex justify-center border-b">
            <button
              className={`py-2 px-4 font-semibold ${
                activeTab === "desc"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("desc")}
            >
              Description
            </button>
            <button
              className={`py-2 px-4 font-semibold ${
                activeTab === "ticket"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("ticket")}
            >
              Ticket
            </button>
          </div>

          <div className="p-4 text-gray-700">
            {activeTab === "desc" && (
              <DescriptionFormating
                description={event.description}
              ></DescriptionFormating>
            )}

            {activeTab === "ticket" && (
              <TicketList tickets={ticketsResponse.data} />
            )}
          </div>
        </div>

        <div className="space-y-10 w-[30%]">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-xl font-bold text-gray-800 mb-2 pb-2">
              {event.name}
            </h1>
            <hr />

            <div className="py-5 space-y-2">
              <p className="text-gray-600 flex items-center">
                <FaCalendarAlt className="mr-2" /> Date: {formattedDateRange}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaClock className="mr-2" /> Time: {formattedTimeRange}
              </p>
              <p className="text-gray-600 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {event.cityName} -{" "}
                {event.locationDetail}
              </p>
            </div>

            <hr />
            <div
              className="grid grid-rows-2 grid-flow-col gap-2 pt-2"
              style={{ borderTop: "2px dashed" }}
            >
              <div className="flex items-center justify-center row-span-2 w-16">
                {event.organizerProfilePicture ? (
                  <img
                    src={event.organizerProfilePicture}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <FaUserCircle
                    size={20}
                    className="text-gray-50"
                  ></FaUserCircle>
                )}
              </div>

              <p className="text-gray-500 text-sm text-left col-span-5">
                Organized by
              </p>
              <p className="text-black font-bold text-left col-span-5">
                {event.organizerName.toLocaleUpperCase()}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Starting price</div>
            <div className="text-xl font-bold text-gray-800 mb-4">
              {event.startingPrice
                ? `Rp${event.startingPrice.toLocaleString()}`
                : "Free"}
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Buy Ticket
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventPage;
