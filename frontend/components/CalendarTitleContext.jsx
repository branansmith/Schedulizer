import React, { createContext, useContext, useState} from 'react';

const CalendarTitleContext = createContext();

export const useCalendarTitle = () => {
  return useContext(CalendarTitleContext);
};

export const CalendarTitleProvider = ({ children }) => {
  const date = new Date();
  const currentMonth = date.toLocaleString('default', { month: 'long' })
  const currentYear = date.getFullYear();
  const defaultTitle = currentMonth + " " + currentYear;

  const [title, setTitle] = useState(defaultTitle);

  return (
    <CalendarTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </CalendarTitleContext.Provider>
  );
};

export default CalendarTitleContext;