import { useState, useEffect } from 'react';



function FilterButton() {
    const [employees, setEmployees] = useState([]);

    //list employees in detecttext employees function
    //make them display 'none' in css
    useEffect(() => {
        

        fetch("http://localhost:3000/employees/list")
            .then((res) => res.json())
            .then((data => {
                setEmployees(data);
            }))

    }, [employees]);

    //useEffect for when page loads, apply filter, default filter is All
    //when user selects filter, save selection in useState constant
    //when page changes it uses the constant to determine what is filtered

    return (
        <div className="employee-list">
            <h2>Filter by Name:</h2>
            {employees.map((employee, index) => {
                return (
                    <button className="employees" onClick={() => filter(employee)} key={index}>{employee}</button>
                );
            })}
            <button className="employees" onClick={() => filter("All")}>All Employees</button>
        </div>
    )
}

function filter(employee) {
    console.log("Filtering for: " + employee);
    const employeeTimes = document.getElementsByClassName("employee-and-time");
    // ^ this is 0 because the page hasn't loaded yet
    // and this function is fired
    //it needs to be filled with the html components
    //so they can be changed
    const filterButton = document.getElementsByClassName("filter-button");

    if (employee.includes("All")) {
        for (let i = 0; i < employeeTimes.length; i++) {
            employeeTimes[i].style.display = "inline-block";

        }
    } else {
        console.log(employeeTimes.length);


        for (let i = 0; i < employeeTimes.length; ++i) {
            let children = employeeTimes[i].childNodes;
            let nameChild = children[0];

            if (!(nameChild.innerHTML.includes(employee))) {
                employeeTimes[i].style.display = "none";
            } else {
                employeeTimes[i].style.display = "inline-block";
            }
        }
    }
    const elements = document.getElementsByClassName("employees");


    filterButton[0].style.display = "inline-block";
}



function listNames() {
    const elements = document.getElementsByClassName("employees");
    const filterButton = document.getElementsByClassName("filter-button");

    filterButton[0].style.display = "none";

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "inline-block";
    }


}

export default FilterButton;