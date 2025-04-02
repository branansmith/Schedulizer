import CalendarDay from './CalendarDay';

const seven = 20;

function Calendar() {
    return (
        <>
            <div className="calendar-container">
                <table className = "table-container">
                    <tr className = "calendar-headers">
                        <th className="calendar-day-names">Sunday</th>
                        <th className="calendar-day-names">Monday</th>
                        <th className="calendar-day-names">Tuesday</th>
                        <th className="calendar-day-names">Wednesday</th>
                        <th className="calendar-day-names">Thursday</th>
                        <th className="calendar-day-names">Friday</th>
                        <th>Saturday</th>
                    </tr>
                    <tr className="first-week">
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                    </tr>
                    <tr className="first-week">
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                    </tr>
                    <tr className="first-week">
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                    </tr>
                    <tr className="first-week">
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                    </tr>
                    <tr className="first-week">
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                    </tr>
                    <tr className="first-week">
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                        <td><CalendarDay/></td>
                    </tr>
                </table>
            </div>
        </>

    )
}

export default Calendar;