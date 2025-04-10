import CalendarDay from './CalendarDay';


const totalCalendarDays = 42;

function Calendar() {
    
    
    const days = Array.from({ length: totalCalendarDays }, (_, i) => i + 1);

    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
        rows.push(days.slice(i, i + 7));
    }

    return (
        <>
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
                    <tbody>
                        {rows.map((week, index) => (
                            <tr key={index}>
                                {week.map(day => (
                                    <td key={day}>
                                        <CalendarDay day={day} />
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

export default Calendar;
