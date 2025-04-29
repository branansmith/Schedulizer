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
    }, []);


    return (
        <div className="employee-list">
            <button className="filter-button" onClick={() => listNames()}>Filter</button>
            {employees.map((employee, index) => {
                return (
                <button className="employees" onClick={() => selectName(employee)} key={index}>{employee}</button>
                );
            })}
            <button className="employees" onClick={() => selectName("All")}>All</button>
        </div>
    )
}


function selectName(employee) {
    const employeeTimes = document.getElementsByClassName("employee-and-time");
    const filterButton = document.getElementsByClassName("filter-button");

    if (employee.includes("All")) {
        for (let i = 0; i < employeeTimes.length; i++) {
            employeeTimes[i].style.display = "inline-block";

          }
    } else {

    
    for (let i = 0; i < employeeTimes.length; ++i) {
        let children = employeeTimes[i].childNodes
        let nameChild = children[0];

        if (!(nameChild.innerHTML.includes(employee))) {
            employeeTimes[i].style.display = "none";
        } else {
            employeeTimes[i].style.display = "inline-block";
        }
    }
    }
    const elements = document.getElementsByClassName("employees");

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }

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