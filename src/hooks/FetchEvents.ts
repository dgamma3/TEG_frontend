import { useQuery } from 'react-query';
import {EventDto} from "../types/EventDto.ts";
import {Moment} from "moment/moment";

interface UseFetchEventsReturn {
  isLoading: boolean;
  data?: EventDto[];
}
function useFetchEvents(date: Moment, venueId: string) : UseFetchEventsReturn {
  const fetchEvents = async ()  => {
    const response = await fetch(`http://localhost:5245/Events/GetEvents?month=${date.month() + 1}&year=${date.year()}&venueId=${venueId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  return useQuery<Array<EventDto>>(['calendarData', date, venueId], fetchEvents);
}

export default useFetchEvents;
