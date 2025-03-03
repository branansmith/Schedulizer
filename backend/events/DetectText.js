//Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)
const run = require("../database/Database.js")

run();

let importantWords = ["R/O", "OFF", "Holiday", "PTO", "FH"]

//ALL EMPLOYEES SHOWN ON THE SCHEDULE MUST BE IN THIS ARRAY
let employees = ["Sam", "Ben", "Juniper", "Romeo", "Esti", "Kamen", "Branan"]

//check against to see if it's a date
const isDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/([0-9]{2})$/;
const isTimeFrame = /(1[0-2]|0?[1-9]):([0-5][0-9])\s?(AM|PM)/

let employeeTimes = new Map();

let sundayExtendTimes = new Map();
let mondayExtendTimes = new Map();
let tuesdayExtendTimes = new Map();
let wednesdayExtendTimes = new Map();
let thursdayExtendTimes = new Map();
let fridayExtendTimes = new Map();
let saturdayExtendTimes = new Map();


async function detectText(photoName) {
  // Import AWS
  const AWS = require("aws-sdk")

  // Set variables
  var credentials = new AWS.SharedIniFileCredentials({ profile: 'AdminUser' });
  AWS.config.credentials = credentials;
  AWS.config.update({ region: 'us-east-1' });
  const bucket = 'canyouseeme15' // the s3 bucket name
  const photo = photoName // the name of file

  // Connect to Textract
  const client = new AWS.Textract();

  var timesScheduled = new Map();
  var extendTimes = new Map();

  // Define paramaters
  const params = {
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: photo
      },
    },
  }

  try {
    // Call API and log response
    const res = await client.detectDocumentText(params).promise();
    //console.log the type of block, text, text type, and confidence
    let weekFilled = 0;
    let employeesFilled = 0;
    const employee = {};
    employee.name;

    employee.sundayTime;
    employee.sundayExtendTime;

    employee.mondayTime;
    employee.mondayExtendTime;

    employee.tuesdayTime;
    employee.tuesdayExtendTime;

    employee.wednesdayTime;
    employee.wednesdayExtendTime;

    employee.thursdayTime;
    employee.thursdayExtendTime;

    employee.fridayTime;
    employee.fridayExtendTime;

    employee.saturdayTime;
    employee.saturdayExtendTime;

    let storeTime = [];
    let waitingSecondTime = false;
    let extendTime = false;

    let dateFound = false;
    var startDate = "";
    let dates = [];

    res.Blocks.forEach(block => {

      //finds week date of schedule
      //sets all dates for current week
      if (!dateFound && block.Text != undefined) {
        let startOfWeek = [];
        startOfWeek = block.Text.split(" ");
        if (isDate.test(startOfWeek[1])) {
          startDate = startOfWeek[1];
          var date = new Date(startDate);
        for (let i = 0; i < 7; ++i) {
          const mm = String(date.getMonth()).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          const yy = String(date.getFullYear()).slice(-2);
          const formattedDate = `${mm}/${dd}/${yy}`;

          dates.push(formattedDate);

          switch (i) {
            case 0:
              employeeTimes.set(formattedDate, []);
              break;
            case 1:
              employeeTimes.set(formattedDate, []);
              break;
            case 2:
              employeeTimes.set(formattedDate, []);
              break;
            case 3:
              employeeTimes.set(formattedDate, []);
              break;
            case 4:
              employeeTimes.set(formattedDate, []);
              break;
            case 5:
              employeeTimes.set(formattedDate, []);
              break;
            case 6:
              employeeTimes.set(formattedDate, []);
              break;
          }
          date.setDate(date.getDate() + 1);
        }

          dateFound = true;
        }

      }

      //starts with deciding if the current block.Text is an important word
      if (importantWords.includes(block.Text) || isTimeFrame.test(block.Text) || employees.includes(block.Text)) {
        let timeFrame = [];
        let time;

        //if it's a time, such as 9:00AM - 5:00PM
        //it begins formatting, ensuring nothing is left out

        //EXTEND TIME IS ALWAYS LAST VALUE
        if (isTimeFrame.test(block.Text)) {
          if (weekFilled == 7) {
            extendTime = true;
          }

          timeFrame = block.Text.split(" ");
          if (isTimeFrame.test(timeFrame[0]) && isTimeFrame.test(timeFrame[2])) {
            time = timeFrame[0] + " - " + timeFrame[2];
          } else if (isTimeFrame.test(timeFrame[0]) && isTimeFrame.test(timeFrame[1]) && timeFrame[2] == undefined) {
            time = timeFrame[0] + " - " + timeFrame[1];
          } else {
            storeTime.push(block.Text);
            waitingSecondTime = true;
          }
        } else {
          time = block.Text;
        }
        if (storeTime.length == 2) {
          time = storeTime[0] + " - " + storeTime[1];
          storeTime = [];
          waitingSecondTime = false;
        }
        if (!waitingSecondTime) {
          if (extendTime) {
            weekFilled = 9;
          } else {
            weekFilled++;
          }

          //after the time has been formatted
          //it adds the time to a map
          //with a bounding box value to be sorted later
          switch (weekFilled) {
            case 1:
              timesScheduled.set(block.Geometry.BoundingBox.Left, time);
              break;
            case 2:
              timesScheduled.set(block.Geometry.BoundingBox.Left, time);
              break;
            case 3:
              timesScheduled.set(block.Geometry.BoundingBox.Left, time);
              break;
            case 4:
              timesScheduled.set(block.Geometry.BoundingBox.Left, time);
              break;
            case 5:
              timesScheduled.set(block.Geometry.BoundingBox.Left, time);
              break;
            case 6:
              timesScheduled.set(block.Geometry.BoundingBox.Left, time);
              break;
            case 7:
              timesScheduled.set(block.Geometry.BoundingBox.Left, time);
              break;
            case 8:
              //sorts the map
              timesScheduled = new Map([...timesScheduled.entries()].sort());

              var dayOfWeek = 0;
              var extendTimesRemaining = extendTimes.size;

              //finds extend time days
              if (extendTimesRemaining != 0) {
                for (let [extendTime, extendGeometry] of extendTimes) {
                  var extendDay = 0;
                  for (let [timeGeometry, time] of timesScheduled) {

                    //console.log("Extend geometry: " + extendGeometry);
                    //console.log("Time geometry: " + timeGeometry);
                    if (Math.abs(extendGeometry - timeGeometry < 0.03)) {
                      extendTimes.set(extendTime, extendDay);
                      extendTimesRemaining--;
                    }
                    extendDay++;
                  }
                }
              }

              //
              for (let [key, value] of timesScheduled) {

                //after the map is sorted, it fills in the values
                //for the employee class

                switch (dayOfWeek) {
                  case 0:
                    employee.sundayTime = value;
                    break;
                  case 1:
                    employee.mondayTime = value;
                    break;
                  case 2:
                    employee.tuesdayTime = value;
                    break;
                  case 3:
                    employee.wednesdayTime = value;
                    break;
                  case 4:
                    employee.thursdayTime = value;
                    break;
                  case 5:
                    employee.fridayTime = value;
                    break;
                  case 6:
                    employee.saturdayTime = value;
                    break;
                }
                dayOfWeek++;
              }

              for (let [time, day] of extendTimes) {

                switch (day) {
                  case 0:
                    employee.sundayExtendTime = time;
                    break;
                  case 1:
                    employee.mondayExtendTime = time;
                    break;
                  case 2:
                    employee.tuesdayExtendTime = time;
                    break;
                  case 3:
                    employee.wednesdayExtendTime = time;
                    break;
                  case 4:
                    employee.thursdayExtendTime = time;
                    break;
                  case 5:
                    employee.fridayExtendTime = time;
                    break;
                  case 6:
                    employee.saturdayExtendTime = time;
                    break;
                }
              }

              if (extendTimes.size == 0) {
                employee.sundayExtendTime = undefined;
                employee.mondayExtendTime = undefined;
                employee.tuesdayExtendTime = undefined;
                employee.wednesdayExtendTime = undefined;
                employee.thursdayExtendTime = undefined;
                employee.fridayExtendTime = undefined;
                employee.saturdayExtendTime = undefined;
              }

              extendTimes.clear();

              //clears map so that 
              //the next employee
              //will have organized times by day of week
              timesScheduled.clear();

              employee.name = block.Text;


              //push into hashmap here
              //what do I do about extend times?
              //think about the design of the calender
              //for the website
              employeeTimes.get(dates[0]).push(employee.sundayTime);

              //employee completely filled at this point
              console.log(employee);
              employeesFilled++;
              weekFilled = 0;
              break;
            case 9:
              //sets extend time
              //employee.mondayExtendTime = block.Text;
              extendTimes.set(block.Text, block.Geometry.BoundingBox.Left);
              extendTime = false;
              weekFilled = 7;
              break;
          }
        }

        //this number represents the amount of employees
        //in the store
        //and prevents the textract program from reading more
        //information than is necessary

        //for some reason, Amazon Textract
        //goes back over the entire photo
        //so this is needed

        //throwing this error does not stop the bot
        if (employeesFilled == employees.length) {

          console.log(employeeTimes.keys());
          throw new Error("Schedule Filled");
        }

      }
    })

  } catch (error) {
    console.log(error);
  }

}



module.exports = detectText;