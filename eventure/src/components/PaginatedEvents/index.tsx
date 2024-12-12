"use client";

import React, { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/api/getEvents";

interface Event {
  eventId: number;
  organizerId: number;
  organizer: string;
  organizerProfile: string;
  name: string;
  thumbnail: string;
  startingPrice: number;
  startedAt: string;
}

const PaginatedEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [firstPage, setFirstPage] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const limit = 12;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents(limit, currentPage);
        setEvents(data.content);
        setTotalPages(data.totalPages);
        setFirstPage(data.firstPage);
        setLastPage(data.lastPage);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
        setTotalPages(0);
        setFirstPage(false);
        setLastPage(false);
      }
    };
    loadEvents();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-eventureBgWhite container mx-auto px-4 py-8">
      <div className="mb-4 flex gap-4">
        <select
          value={categoryId || ""}
          onChange={(e) =>
            setCategoryId(e.target.value ? Number(e.target.value) : null)
          }
          className="rounded bg-gray-200 p-2"
        >
          <option value="">Select Category</option>
          {/* Add options here */}
        </select>
        <select
          value={cityId || ""}
          onChange={(e) =>
            setCityId(e.target.value ? Number(e.target.value) : null)
          }
          className="rounded bg-gray-200 p-2"
        >
          <option value="">Select City</option>
          {/* Add options here */}
        </select>
        <button
          onClick={() => setCurrentPage(0)}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event) => (
          <EventCard
            key={event.eventId}
            eventId={event.eventId}
            thumbnail={event.thumbnail}
            eventName={event.name}
            price={event.startingPrice ? `$${event.startingPrice}` : "Free"}
            date={new Date(event.startedAt).toDateString()}
            organizer={event.organizer}
            organizerPicture={
              event.organizerProfile ||
              "https://example.com/default-organizer.jpg"
            }
          />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-10">
        <div className="flex justify-center" style={{ width: "100px" }}>
          {!firstPage && (
            <button
              className="rounded bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>
          )}
        </div>
        <span className="text-gray-700">
          {currentPage + 1} / {totalPages}
        </span>
        <div className="flex justify-center" style={{ width: "100px" }}>
          {!lastPage && (
            <button
              className="rounded bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginatedEvents;
