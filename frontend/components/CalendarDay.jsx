import EmployeeTime from './EmployeeTime';

function CalendarDay() {
    return(
        <>
            <div className="calendar-day">
                <p className = "day-number">1</p>
                <EmployeeTime/>
                {/*potentially change colorway to grey and softer tones on the eyes, white is too bright*/}
            </div>
        </>
    )
}

export default CalendarDay;