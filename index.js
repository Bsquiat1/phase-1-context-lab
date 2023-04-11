class Employee {
    constructor(firstName, familyName, title, payPerHour) {
      this.firstName = firstName;
      this.familyName = familyName;
      this.title = title;
      this.payPerHour = payPerHour;
      this.timeInEvents = [];
      this.timeOutEvents = [];
    }
    
    hoursWorkedOnDate(date) {
      const timeInEvent = this.timeInEvents.find(event => event.date === date);
      const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
      
      if (!timeInEvent || !timeOutEvent) {
        return 0;
      }
      
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    }
    
    wagesEarnedOnDate(date) {
      const hoursWorked = this.hoursWorkedOnDate(date);
      const wagesEarned = hoursWorked * this.payPerHour;
      return wagesEarned;
    }
  }
  
  function createEmployeeRecord(employeeData) {
    const employee = new Employee(
      employeeData[0], 
      employeeData[1], 
      employeeData[2], 
      employeeData[3]
    );
    
    return employee;
  }
  
  function createEmployeeRecords(employeesData) {
    const employees = employeesData.map(employeeData => createEmployeeRecord(employeeData));
    
    return employees;
  }
  
  function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    
    const timeInEvent = {
      type: 'TimeIn',
      date: date,
      hour: parseInt(hour, 10)
    };
    
    employee.timeInEvents.push(timeInEvent);
    
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    
    const timeOutEvent = {
      type: 'TimeOut',
      date: date,
      hour: parseInt(hour, 10)
    };
    
    employee.timeOutEvents.push(timeOutEvent);
    
    return employee;
  }
  
  
  
  function findEmployeeByFirstName(collection, firstName) {
    const employee = collection.find(employee => employee.firstName === firstName);
    
    return employee;
  }
  
  function calculatePayroll(employees) {
    const totalWages = employees.reduce((total, employee) => {
      const wages = allWagesFor(employee);
      return total + wages;
    }, 0);
    
    return totalWages;
  }
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

