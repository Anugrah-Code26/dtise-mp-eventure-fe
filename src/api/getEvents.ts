import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

interface EventSearch {
  eventId: number;
  organizerId: number;
  organizer: string;
  organizerProfile: string;
  name: string;
  thumbnail: string;
  startingPrice: number;
  startedAt: string;
}

interface Event {
  eventId: number;
  eventName: string;
}

interface EventResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Event[];
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
  cityId?: number
): Promise<PaginationInfo<EventSearch>> => {
  const response = await axios.get(`${API_URL}/event`, {
    params: {
      limit,
      page,
      eventCategoryId,
      cityId,
    },
  });
  return response.data.data;
};

export const getEventsByName = async (query: string): Promise<Event[]> => {
  try {
    const response = await axios.get<EventResponse>(
      `${API_URL}/event/search-by-name`,
      {
        params: {
          query,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching events by name:", error);
    return [];
  }
};
