import { useState, useEffect } from 'react';



function FilterButton() {
    const [employees, setEmployees] = useState([]);

    const [currentFilter, setFilter] = useState("All");
    //list employees in detecttext employees function
    //make them display 'none' in css
    useEffect(() => {
        fetch("http://localhost:3000/employees/list")
            .then((res) => res.json())
            .then((data => {
                setEmployees(data);
            }))
        console.log(localStorage.getItem('filter'));
        setFilter(localStorage.getItem('filter'));
        filter(currentFilter);
    }, []);

    //useEffect for when page loads, apply filter, default filter is All
    //when user selects filter, save selection in useState constant
    //when page changes it uses the constant to determine what is filtered

    return (
        <div className="employee-list">
            <button className="filter-button" onClick={() => listNames()}>Filter</button>
            {employees.map((employee, index) => {
                return (
                <button className="employees" onClick={() => filter(employee)} key={index}>{employee}</button>
                );
            })}
            <button className="employees" onClick={() => filter("All")}>All</button>
        </div>
    )
}


function filter(employee) {
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
      localStorage.setItem('filter', employee);
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