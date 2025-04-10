import React, { createContext, useContext, useState } from 'react';

const CalendarTitleContext = createContext();

export const useCalendarTitle = () => {
  return useContext(CalendarTitleContext);
};

export const CalendarTitleProvider = ({ children }) => {
  const date = new Date();
  
  // Extract the current month and year for the default title
  const currentMonthIndex = date.getMonth(); // Get current month index (0-11)
  const currentYear = date.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const defaultTitle = `${monthNames[currentMonthIndex]} ${currentYear}`;

  const [title, setTitle] = useState(defaultTitle);

  // Helper function to extract month and year from the current title
  const getMonthYearFromTitle = (title) => {
    const [month, year] = title.split(' ');
    return { month: monthNames.indexOf(month), year: parseInt(year, 10) };
  };

  // Function to get the first day of the month from the title
  const getFirstDayOfMonth = () => {
    const { month, year } = getMonthYearFromTitle(title); // Get current month and year from state
    const firstDay = new Date(year, month, 1); // Get the first day of the month
    return firstDay.getDay(); // Return the weekday (0 = Sunday, 1 = Monday, etc.)
  };

  // Function to increment the month
  const incrementMonth = () => {
    const { month, year } = getMonthYearFromTitle(title); // Get current month and year from state
    const newDate = new Date(year, month + 1, 1); // Move to next month
    setTitle(`${monthNames[newDate.getMonth()]} ${newDate.getFullYear()}`);
  };

  // Function to decrement the month
  const decrementMonth = () => {
    const { month, year } = getMonthYearFromTitle(title); // Get current month and year from state
    const newDate = new Date(year, month - 1, 1); // Move to previous month
    setTitle(`${monthNames[newDate.getMonth()]} ${newDate.getFullYear()}`);
  };

  return (
    <CalendarTitleContext.Provider value={{
      title, 
      setTitle, 
      incrementMonth, 
      decrementMonth, 
      getFirstDayOfMonth // Expose the function
    }}>
      {children}
    </CalendarTitleContext.Provider>
  );
};

export default CalendarTitleContext;
