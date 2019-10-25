function createEmployeeRecord(array) {
  const employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord
}

function createEmployeeRecords(array) {
  return array.map(function(element) {
    return createEmployeeRecord(element)
  })
}

function createTimeInEvent(dateTime) {
  let [date, hour] = dateTime.split(" ")

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  })
  return this
}

function createTimeOutEvent(dateTime) {
  let [date, hour] = dateTime.split(" ")

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  })
  return this
}

function hoursWorkedOnDate(givenDate) {
  let timeIn = this.timeInEvents.find(function(e){
    return e.date === givenDate
  })
  let timeOut = this.timeOutEvents.find(function(e){
    return e.date === givenDate
  })
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(givenDate) {
  let hoursWorked = hoursWorkedOnDate.call(this, givenDate)
  let wageEarned = hoursWorked * this.payPerHour
  return wageEarned
}

function findEmployeeByFirstName(array, firstName) {
    for (const element of array) {
       return firstName === element.firstName ? element : undefined
    }
}

function calculatePayroll(array) {
  return array.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
