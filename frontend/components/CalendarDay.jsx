import EmployeeContainer from './EmployeeContainer';

//maybe i pass this component a date and extract each
//part of the date
function CalendarDay({day, monthAndYear}) {
    return(
        <>
            <div className="calendar-day">
                <p className = "day-number">{day}</p>
                <EmployeeContainer day={day} monthAndYear={monthAndYear}/>
            </div>
        </>
    )
}

export default CalendarDay;