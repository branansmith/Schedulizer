import CalendarDay from './CalendarDay';
import NonCalendarDay from './NonCalendarDay';
import CalendarTitle from '../components/CalendarTitle'
import { useEffect } from 'react';
import { useCalendarTitle } from './CalendarTitleContext';


const totalCalendarDays = 42;

function Calendar() {

    const { title, getFirstDayOfMonth, getLastDayOfMonth } = useCalendarTitle();
    var firstDay = getFirstDayOfMonth();
    var lastDay = getLastDayOfMonth();
    useEffect(() => {
        getFirstDayOfMonth();
        getLastDayOfMonth();
      },[title])

    
    const firstDayNotFound = true;

    const days = Array.from({ length: totalCalendarDays }, (_, i) => i + 1);

    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
        rows.push(days.slice(i, i + 7));
    }

    return (
        <>
        <CalendarTitle/>
            <div className="calendar-container">
                <table className="table-container">
                    <thead>
                        <tr className="calendar-headers">
                            <th className="calendar-day-names">Sunday</th>
                            <th className="calendar-day-names">Monday</th>
                            <th className="calendar-day-names">Tuesday</th>
                            <th className="calendar-day-names">Wednesday</th>
                            <th className="calendar-day-names">Thursday</th>
                            <th className="calendar-day-names">Friday</th>
                            <th className="calendar-day-names">Saturday</th>
                        </tr>
                    </thead>
                    <tbody> {/* if index == firstDay, firstDayNotFound = false
                                if (firstDayNotFound) map prev month day
                    */}
                        {rows.map((week, index) => (
                            <tr key={index}>
                                {week.map(day => (
                                    <td key={day}>
                                        {isInMonth(day, firstDay, lastDay)}
                                        
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

function isInMonth(day, firstDay, lastDay) {
    if (day - 1 >= firstDay && day - firstDay <= lastDay) {
        return <CalendarDay day={day - firstDay}/>;
    } else {
        return <NonCalendarDay/>;
    }
}

export default Calendar;
