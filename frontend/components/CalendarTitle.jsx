import { useState } from 'react';

const currentDate = new Date();

function CalendarTitle() {
    const [monthName, setMonth] = useState(currentDate.toLocaleString('default', { month: 'long' }));
    const [year, setYear] = useState(currentDate.getFullYear());

    const updateDate = (increment) => {
        currentDate.setMonth(currentDate.getMonth() + increment);
        setMonth(currentDate.toLocaleString('default', { month: 'long' }));
        setYear(currentDate.getFullYear());
    }

    return (
        <>
            <title>Store 7507</title>
            <div className="calendar-title-container">
                <button className="month-button" onClick={() => updateDate(-1)}>&lt;</button>
                <div className="calendar-title-box">
                    <h3 className="calendar-title">{monthName} {year}</h3>
                </div>
                <button className="month-button" onClick={() => updateDate(1)}>&gt;</button>
            </div>
        </>
    );
}

export default CalendarTitle;
