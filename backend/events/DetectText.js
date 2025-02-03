//Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)

let importantWords = ["R/O", "OFF", "Holiday", "PTO", "FH"]
let employees = ["Sam", "Ben", "Juniper", "Romeo", "Esti", "Kamen", "Branan"]

//check against to see if it's a date
const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/([0-9]{2})$/;
const isTimeFrame = /(1[0-2]|0?[1-9]):([0-5][0-9])\s?(AM|PM)/

async function detectText(photoName) {
  // Import AWS
  const AWS = require("aws-sdk")

  // Set variables
  var credentials = new AWS.SharedIniFileCredentials({ profile: 'AdminUser' });
  AWS.config.credentials = credentials;
  AWS.config.update({ region: 'us-east-1' });
  const bucket = 'canyouseeme15' // the s3 bucket name
  const photo = photoName // the name of file

  // Create a canvas and get the context
  const { createCanvas } = require('canvas')
  const canvas = createCanvas(200, 200)
  const ctx = canvas.getContext('2d')

  // Connect to Textract
  const client = new AWS.Textract();
  // Connect to S3 to display image
  const s3 = new AWS.S3();

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
    let personsFilled = 0;
    const person = {};
      person.name;
      person.sundayTime;
      person.mondayTime;
      person.tuesdayTime;
      person.wednesdayTime;
      person.thursdayTime;
      person.fridayTime;
      person.saturdayTime;
      person.extendTime;

    let storeTime = [];
    let waitingSecondTime = false;
    let extendTime = false;

    res.Blocks.forEach(block => {
      
      


      //console.log(block.Geometry.BoundingBox);
      //console.log(`Confidence: ${block.Confidence}`)
      //regex.test(block.Text) checks if date

      //extend times come after all other times
      //extend times throw off the order, as well as not grouping the time 
      //frames, for example sometimes the block.Text only prints a 9:30AM
      //instead of a 9:30AM - 5:30PM
      
      if (importantWords.includes(block.Text) || isTimeFrame.test(block.Text) || employees.includes(block.Text)) {
        let timeFrame = [];
        let time;
        if(isTimeFrame.test(block.Text)) {
          if (weekFilled == 7) {
            extendTime = true;
          }
          //console.log(block.Text);
          //console.log(block.Geometry.BoundingBox);
          timeFrame = block.Text.split(" ");
          if (isTimeFrame.test(timeFrame[0]) && isTimeFrame.test(timeFrame[2])) {
            console.log("1st if statement" + block.Text + " " + timeFrame);
            time = timeFrame[0] + " - " + timeFrame[2];
          } else if (isTimeFrame.test(timeFrame[0]) && isTimeFrame.test(timeFrame[1]) && timeFrame[2] == undefined) {
            console.log("2nd if statement" + block.Text + " " + timeFrame);
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
        if(!waitingSecondTime) {
          if (extendTime) {
            weekFilled = 9;
          } else {
            weekFilled++;
          }
        
        switch (weekFilled) {
          case 1:
            person.sundayTime = time;
            break;
          case 2:
            person.mondayTime = time;
            break;
          case 3:
            person.tuesdayTime = time;
            break;
          case 4:
            person.wednesdayTime = time;
            break;
          case 5:
            person.thursdayTime = time;
            break;
          case 6:
            person.fridayTime = time;
            break;
          case 7:
            person.saturdayTime = time;
            break;
          case 8:
            person.name = block.Text;
            console.log(person);
            person.extendTime = " ";
            personsFilled++;
            weekFilled = 0;
            break;
          case 9:
            person.extendTime = block.Text;
            extendTime = false;
            weekFilled = 7;
            break;
        }
      }

      //this number represents the amount of employees
      //in the store
      //and prevents the textract program from reading more
      //information than is necessary
      if (personsFilled == 7) {
        throw new Error("Schedule Filled");
      }

      }
    })
      
    } catch (error) {
      console.log(error);
    }

}



module.exports = detectText;