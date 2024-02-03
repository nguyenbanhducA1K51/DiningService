import Calendar from 'react-calendar';
import { useState } from 'react';
export const Calendar = (prop) => {   
    const {dateCalendar}=prop
    const [calendarVisible, setCalendarVisible] = useState(false);
    const toggleCalendar = () => {
        setCalendarVisible(!calendarVisible);
    };

    const closeCalendar = () => {
        setCalendarVisible(false);
    };
    return (
        <div className="col d-flex flex-column justify-content-center align-items-center" style={{
            position: 'relative'
        }}>

            <div>

                {calendarVisible && (
                    <div
                        ref={calendarRef}
                        style={{
                            display: "inline-block",
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            maxWidth: 'unset',
                            zIndex: 1000,
                        }}
                        
                    >
                        <Calendar
                            onChange={updateAnchorDate}

                            value={dateCalendar}
                        />
                      
                    </div>
                )}
            </div>


        </div>
    )
}