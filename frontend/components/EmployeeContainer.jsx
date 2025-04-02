import EmployeeTime from './EmployeeTime';

function EmployeeContainer() {
    const container = document.getElementById('employee-container');

    return (
    <>
    <div className="employee-container" id="employee-container">
        <EmployeeTime
        employee={"Kamen"}
        time={"11:00AM - 2:00PM"}
        />
        <EmployeeTime
        employee={"Juniper"}
        time={"9:00AM - 4:00PM"}
        />
        <EmployeeTime
        employee={"Branan"}
        time={"5:00PM - 9:00PM"}
        />
    </div>
    
    </>
    )
}

export default EmployeeContainer;