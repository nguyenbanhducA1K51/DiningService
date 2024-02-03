import Calendar from 'react-calendar';
import { useState } from 'react';
export const CustomCalendar = ({prop}) => {   
    const {dateCalendar,updateAnchorDate}=prop

    return (
        <div className="col d-flex flex-column justify-content-center align-items-center" style={{
            position: 'relative'
        }}>

            <div>                   
                    <div
                      
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
              
            </div>
        </div>
    )
}