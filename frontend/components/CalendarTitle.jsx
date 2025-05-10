import { useState } from 'react';
import { useCalendarTitle } from './CalendarTitleContext';
import FilterButton from './FilterButton'

const currentDate = new Date();

function CalendarTitle() {
  // Initialize the month and year based on the current date
  const [monthName, setMonth] = useState(currentDate.toLocaleString('default', { month: 'long' }));
  const [year, setYear] = useState(currentDate.getFullYear());
  const { title, incrementMonth, decrementMonth, getFirstDayOfMonth, getLastDayOfMonth } = useCalendarTitle();


  return (
    <>
      <title>Store 7507</title>
      <div className="calendar-title-container">
        <button className="month-button" onClick={() => decrementMonth()}>&lt;</button>
        <div className="calendar-title-box">
          <h3 className="calendar-title">{title}</h3>
        </div>
        
        <button className="month-button" onClick={() => incrementMonth()}>&gt;</button>
        <FilterButton/>

      </div>
    </>
  );
}

export default CalendarTitle;
