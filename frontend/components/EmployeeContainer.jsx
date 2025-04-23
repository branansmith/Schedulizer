import { useEffect, useState } from 'react';
import EmployeeTime from './EmployeeTime';
import { Skeleton, Box } from '@mui/material';

function EmployeeContainer({ day, monthAndYear }) {
    const isTimeFrame = /(1[0-2]|0?[1-9]):([0-5][0-9])\s?(AM|PM)/

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    if (!monthAndYear) {
        return null;
    }

    const splitMonthAndYear = monthAndYear.split(" ");
    const splitMonth = splitMonthAndYear[0];

    const pad = (num) => num.toString().padStart(2, '0');

    const month = getNumberMonth(splitMonth);
    const paddedMonth = pad(month);
    const paddedDay = pad(day);
    const year = splitMonthAndYear[1].slice(-2);

    useEffect(() => {
        setLoading(true); // start loading
        fetch(`http://localhost:3000/employees/${paddedMonth}%2F${paddedDay}%2F${year}`)
            .then((res) => res.json())
            .then((data) => {
                setEmployees(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [month, day, year]);

    if (loading) {
      return (
          <div className="employee-container" id="employee-container">
              {[...Array(3)].map((_, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                      <Skeleton variant="text" width={120} height={30} />
                      <Skeleton variant="text" width={80} height={20} />
                  </Box>
              ))}
          </div>
      );
  }
    //need to implement loading somehow as well as 
    //if there are more people on the schedule than normal
    return (
      <div className="employee-container" id="employee-container">
          {employees.map((employeeArray, index) => (
              <div key={index} className="employee-group">
                  {employeeArray.employees.map((entry, subIndex) => {
                      const split = employeeArray.employees[subIndex]?.split(": ") || [];
                      const name = split[0] ?? "Unknown";
                      const time = split[1] ?? "Unknown";

                      if(!isTimeFrame.test(time)) {
                        return null;
                      }

                      return (
                          <EmployeeTime
                              key={`${index}-${subIndex}`}
                              employee={name}
                              time={time}
                          />
                      );
                  })}
              </div>
          ))}
      </div>
  );
}

function getNumberMonth(month) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months.indexOf(month) + 1;
}

export default EmployeeContainer;
