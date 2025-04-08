import { useState } from 'react';
import { useCalendarTitle } from './CalendarTitleContext';

const currentDate = new Date();

function CalendarTitle() {
  // Initialize the month and year based on the current date
  const [monthName, setMonth] = useState(currentDate.toLocaleString('default', { month: 'long' }));
  const [year, setYear] = useState(currentDate.getFullYear());
  const { title, setTitle } = useCalendarTitle();

  const updateDate = (increment) => {
    // First, update the currentDate object
    currentDate.setMonth(currentDate.getMonth() + increment);

    // Then, update the month and year state based on the updated currentDate
    setMonth(currentDate.toLocaleString('default', { month: 'long' }));
    setYear(currentDate.getFullYear());

    setTitle(title => [`${currentDate.toLocaleString('default', { month: 'long' })}` + " " + `${currentDate.getFullYear()}`]);
  };

  return (
    <>
      <title>Store 7507</title>
      <div className="calendar-title-container">
        <button className="month-button" onClick={() => updateDate(-1)}>&lt;</button>
        <div className="calendar-title-box">
          <h3 className="calendar-title">{title}</h3>
        </div>
        <button className="month-button" onClick={() => updateDate(1)}>&gt;</button>
      </div>
    </>
  );
}

export default CalendarTitle;
