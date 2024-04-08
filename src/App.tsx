import {useState} from 'react';
import {useMobileDection} from "./hooks/DeviceDetect.ts";
import moment from "moment/moment";
import {CalendarViewForMobile} from "./Components/CalendarViewForMobile/CalendarViewForMobile.tsx";
import {CalendarViewForTabletAndGreater} from "./Components/Calendar/Calendar.tsx";
import VenusDropDown from "./Components/VenuDropDown/VenusDropDown.tsx";

export interface VenueInfo {
    id: string,
    name: string| undefined;}


const App = () => {
    const [venueInfo, setVenueInfo] = useState<VenueInfo | null>(null);
    const [date, setDate] = useState(moment());

    const isMobile = useMobileDection();
    const venueChangedHandler = (venueId : string, venueName : string | undefined) =>{
        setVenueInfo({id: venueId, name: venueName});
    }


    const handlePrevMonth = () => {
        setDate(date.clone().subtract(1, 'month'));

    };

    const handleNextMonth = () => {
        setDate(date.clone().add(1, 'month'));
    };


    return (
        <div>

            <VenusDropDown venueChangedHandler={venueChangedHandler}/>
            <div className="calendar">
                <div className="header">
                    <button className="prev-month" onClick={handlePrevMonth}>&lt;</button>
                    <h2 className="month-year">{date.format('MMMM YYYY')}</h2>
                    <button className="next-month" onClick={handleNextMonth}>&gt;</button>
                </div>
            </div>

            {isMobile === true && venueInfo &&   <CalendarViewForMobile venueId={venueInfo.id} venueName={venueInfo.name} date={date}/>}
            {isMobile === false && venueInfo && <CalendarViewForTabletAndGreater venueId={venueInfo.id} venueName={venueInfo.name}  date={date} />
            }



        </div>
    );
};

export default App;
