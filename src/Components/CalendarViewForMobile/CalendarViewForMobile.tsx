import React, { useState } from 'react';
import './CalendarMobile.css';
import {Moment} from "moment/moment";
import {EventDto} from "../../types/EventDto.ts";
import useFetchEvents from "../../hooks/FetchEvents.ts";
import Modal from "../Modal/modal.tsx";

 interface CalendarViewForMobileProps {
    venueId: string;
    date: Moment;
    venueName: string | undefined;
}

function getOrdinalSuffix(day: number) {
    let j = day % 10,
        k = day % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

const groupedByDay = (array :EventDto[]) => array.reduce((accumulator : EventDto[][], current :EventDto) => {
    const key = current.startDateDay;

    // If the key doesn't exist, create it and assign an array with the current item
    if (!accumulator[key]) {
        accumulator[key] = [];
    }

    // Add the current item to the array for the key
    accumulator[key].push(current);

    return accumulator;
}, []);

export const CalendarViewForMobile : React.FC<CalendarViewForMobileProps>  = ({venueId, date, venueName}) => {
    const {isLoading, data: events} = useFetchEvents(date, venueId);
    const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);

    if (!venueId) return <div>Please Select a venu first</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!events || events.length === 0) return <div>No Events Founds</div>;


    const openModalWithEvent = (event: EventDto) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="MobileEventsContainer">

            {groupedByDay(events).map((event: EventDto[]) => (
                <div
                    key={event[0].name}
                >
                    <div className="schedule">
                        <div className="date">{event[0].startDateDay}{getOrdinalSuffix(event[0].startDateDay)} of June
                        </div>
                        {event.map((event) => (
                            <div className="event">
                                <div className="time">{event.startTime}</div>
                                <div className="title" onClick={() => openModalWithEvent(event)}>{event.name}</div>


                            </div>
                        ))}

                    </div>

                </div>
            ))}
            {selectedEvent && <Modal isOpen={!!selectedEvent} onClose={closeModal} selectedEvent={selectedEvent}
                                     venueName={venueName}/>}
        </div>

    );
};
