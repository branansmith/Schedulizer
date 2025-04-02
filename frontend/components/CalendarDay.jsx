import EmployeeContainer from './EmployeeContainer';

function CalendarDay() {
    return(
        <>
            <div className="calendar-day">
                <p className = "day-number">1</p>
                <EmployeeContainer/>
            </div>
        </>
    )
}

export default CalendarDay;