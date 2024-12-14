import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

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

interface PaginationInfo<T> {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  content: T[];
  lastPage: boolean;
  firstPage: boolean;
}

export const getEvents = async (
  limit: number,
  page: number,
  eventCategoryId?: number,
  cityId?: number,
): Promise<PaginationInfo<Event>> => {
  const response = await axios.get(`${API_URL}/events`, {
    params: {
      limit,
      page,
      eventCategoryId,
      cityId,
    },
  });
  return response.data.data;
};
