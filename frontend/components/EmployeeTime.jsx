

function EmployeeTime({employee, time}) {
    return (
        <div className="employee-and-time">
            <b className="employee-name">{employee}</b>
            <p className="employee-time">{time}</p>
        </div>

    )
}

export default EmployeeTime;