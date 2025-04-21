import { useEffect } from 'react';
import EmployeeTime from './EmployeeTime';

function EmployeeContainer({ day, monthAndYear }) {

    if (!monthAndYear) {
        console.error("monthAndYear is undefined!");
        return null; // Bail out to avoid crashing
    }

    const splitMonthAndYear = monthAndYear.split(" ");
    const splitMonth = splitMonthAndYear[0];

    const pad = (num) => num.toString().padStart(2,'0');

    const month = getNumberMonth(splitMonth);
    const paddedMonth = pad(month);
    const paddedDay = pad(day);
    const year = splitMonthAndYear[1].slice(-2);

    useEffect(() => {
        console.log(paddedMonth + " " + paddedDay + " " + year);
        fetch(`http://localhost:3000/employees/${paddedMonth}%2F${paddedDay}%2F${year}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.error(err));
    }, [month, day, year]);

    return (
        <div className="employee-container" id="employee-container">
            <EmployeeTime employee="Kamen" time="11:00AM - 2:00PM" />
            <EmployeeTime employee="Juniper" time="9:00AM - 4:00PM" />
            <EmployeeTime employee="Branan" time="5:00PM - 9:00PM" />
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
