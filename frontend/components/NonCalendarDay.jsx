import EmployeeContainer from './EmployeeContainer';

function NonCalendarDay({day}) {
    return(
        <>
            <div className="non-calendar-day">
                <p className = "day-number">{day}</p>
                <EmployeeContainer/>
            </div>
        </>
    )
}

export default NonCalendarDay;