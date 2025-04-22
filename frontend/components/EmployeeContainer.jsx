import { useEffect, useState } from 'react';
import EmployeeTime from './EmployeeTime';

function EmployeeContainer({ day, monthAndYear }) {

    const [employees, setEmployees] = useState([]);

    if (!monthAndYear) {
        console.error("monthAndYear is undefined!");
        return null; // Bail out to avoid crashing
    }

    const splitMonthAndYear = monthAndYear.split(" ");
    const splitMonth = splitMonthAndYear[0];

    const pad = (num) => num.toString().padStart(2, '0');

    const month = getNumberMonth(splitMonth);
    const paddedMonth = pad(month);
    const paddedDay = pad(day);
    const year = splitMonthAndYear[1].slice(-2);

    useEffect(() => {
        fetch(`http://localhost:3000/employees/${paddedMonth}%2F${paddedDay}%2F${year}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setEmployees(data);
            })
            .catch((err) => console.error(err));
    }, [month, day, year]);

    //for let i = 0; i < array.length make new employee time for each
    //iteration
    return (
        <div className="employee-container" id="employee-container">
          {employees.map((employeeArray, index) => (
            <div key={index} className="employee-group">
              {employeeArray.employees.map((entry, subIndex) => {
                const split = employeeArray.employees[subIndex]?.split(": ") || [];
                const name = split[0] ?? "Unknown";
                const time = split[1] ?? "Unknown";
      
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
