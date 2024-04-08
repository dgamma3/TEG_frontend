import React, { useState, useEffect } from 'react';
import {Moment} from 'moment'; // If you chose to install moment
import './Calendar.css';
import useFetchEvents from "../../hooks/FetchEvents.ts";
import Modal from "../Modal/modal.tsx";
import {EventDto} from "../../types/EventDto.ts";


interface CalendarViewForTabletAndGreater {
    venueId: string;
    date: Moment;
    venueName: string | undefined;
}

interface Day {
    date: null |  Moment;
}


export const CalendarViewForTabletAndGreater : React.FC<CalendarViewForTabletAndGreater>  = ({venueId, date, venueName}) => {

        const [days, setDays] = useState<Array<Day>>([]);
        const {isLoading, data:events} = useFetchEvents(date, venueId);
        const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);

        useEffect(() => {
            generateDaysInMonth();
        }, [date]); // Update days when the date changes

        const generateDaysInMonth = () => {
            const startOfMonth = date.clone().startOf('month');
            const endOfMonth = date.clone().endOf('month');

            let tempDate = startOfMonth.clone();
            const days : Day[] = [];


            for (let i = 0; i < startOfMonth.day(); i++) {
                days.push({
                    date: null,
                });
            }

            while (tempDate.isBefore(endOfMonth)) {
                days.push({
                    date: tempDate.clone(),
                });
                tempDate.add(1, 'day');
            }
            setDays(days);
        };


        const openModalWithEvent = (event: EventDto) => {
            setSelectedEvent(event);
        };

        const closeModal = () => {
            setSelectedEvent(null);
        };



    if (!venueId) return <div>Please Select a venu first</div>;
        if (isLoading) return <div>Loading...</div>;
        if (!events || events.length === 0) return <div>No Events Founds</div>;

        const getEventsPerDay = (day : Day) => {
            return events.filter(event => event.startDateDay === day.date?.date());
        }

        return (
            <div className="calendar">
                <div className="weekdays">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>

                <div className="days">
                    {days.map((day, index) => (
                        <div
                            key={index}
                        >
                            {day.date?.format('D')}
                            {day.date && getEventsPerDay(day).map(event => (
                                <>
                                    <p key={event.name} onClick={() => openModalWithEvent(event)}>{event.name}</p>
                                </>
                            ))}

                        </div>
                    ))}
                    {selectedEvent && (
                        <Modal isOpen={!!selectedEvent} onClose={closeModal} selectedEvent={selectedEvent}
                               venueName={venueName}/>


                    )}
                </div>
            </div>
        );
    }



