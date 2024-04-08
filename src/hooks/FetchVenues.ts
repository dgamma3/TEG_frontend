
import {VenuesDto} from "../types/VenusDto.ts";
import {useQuery} from "react-query";

interface UseFetchEventsReturn {
  isLoading: boolean;
  data?: VenuesDto[];
}
function useVenuesQuery() : UseFetchEventsReturn {
  const fetchVenus = async ()  => {
    const response = await fetch('http://localhost:5245/Venus/Getvenues');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  return useQuery<Array<VenuesDto>>(['venues'], fetchVenus);
}
export default useVenuesQuery;


