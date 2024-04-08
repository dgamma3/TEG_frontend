import {useState} from 'react';

import useVenuesQuery from "../../hooks/FetchVenues.ts";

export interface VenusDropDownProps {
    venueChangedHandler: (venueId : string, venueName: string | undefined) => void;

}


const VenusDropDown: React.FC<VenusDropDownProps> = ({venueChangedHandler}) => {
    const {isLoading, data: venues} = useVenuesQuery();
    const [selectedVenue, setSelectedVenue] = useState("");

    if (isLoading) return <p>Loading Venus...</p>;
    if (!venues) return <p>No Venus...</p>;

    function onChangeVenue(e: { target: { value: string }; }) {
        setSelectedVenue(e.target.value);
        const selectedVenue = venues?.find(venue => venue.id === parseInt(e.target.value));

        venueChangedHandler(e.target.value, selectedVenue?.name);
    }
    return (
        <>
            <select value={selectedVenue} onChange={onChangeVenue}>
                <option value="">Select a country</option>

                {venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                        {venue.name}
                    </option>
                ))}
            </select>
        </>
    );
};

export default VenusDropDown;
