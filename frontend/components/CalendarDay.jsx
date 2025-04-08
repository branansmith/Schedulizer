import EmployeeContainer from './EmployeeContainer';

function CalendarDay({day}) {
    return(
        <>
            <div className="calendar-day">
                <p className = "day-number">{day}</p>
                <EmployeeContainer/>
            </div>
        </>
    )
}

export default CalendarDay;