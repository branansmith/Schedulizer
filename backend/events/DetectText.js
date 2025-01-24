//Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)

// IMPORTANT WORDS: 01/25 <-- DATES FOR KNOWING WHAT WEEK OF THE CALENDAR IT IS
// 7:30AM/PM - 9:30AM/PM, OFF, Holiday, R/O
//month/day/year
// Dates: 01-12/1-31/1-99 

//to find which days are the important words, sort by y axis, the lower
// numbers are going to be Sunday, Monday, 
//the higher numbers are going to be Friday, Saturday
//once you get the first 7 important words and sort them
//restart the counter
//for loop that checks if current iteration is a modulo of 7
//if it is, then that iteration is the index of the employee
//so for example, if current iteration is % 7 and current iteration = 7
//that would be sam because that's the first 7, so sam would = 0, first
let importantWords = ["R/O", "OFF", "Holiday"]
let employees = ["Sam", "Ben", "Juniper", "Romeo", "Esti", "Kamen", "Branan"]

//check against to see if it's a date
const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/([0-9]{2})$/;
const isTimeFrame = /(1[0-2]|0?[1-9]):([0-5][0-9])\s?(AM|PM)/

async function detectText(photoName) {
  // Import AWS
  const AWS = require("aws-sdk")
  // Use Image-Size to get 
  const sizeOf = require('image-size');
  // Image tool to draw buffers
  const images = require("images");

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

  // Function to display image
  async function getImage() {
    const imageData = s3.getObject(
      {
        Bucket: bucket,
        Key: photo
      }

    ).promise();
    return imageData;
  }


  try {
    // Call API and log response
    const res = await client.detectDocumentText(params).promise();
    //console.log the type of block, text, text type, and confidence
    let weekFilled = 0;
    const person = {};
      person.name;
      person.sundayTime;
      person.mondayTime;
      person.tuesdayTime;
      person.wednesdayTime;
      person.thursdayTime;
      person.fridayTime;
      person.saturdayTime;
    res.Blocks.forEach(block => {
      
      


      //console.log(block.Geometry.BoundingBox);
      //console.log(`Confidence: ${block.Confidence}`)
      //regex.test(block.Text) checks if date

      //extend times come after all other times
      //extend times throw off the order, as well as not grouping the time 
      //frames, for example sometimes the block.Text only prints a 9:30AM
      //instead of a 9:30AM - 5:30PM
      let needSecondTime = false;
      if (importantWords.includes(block.Text) || isTimeFrame.test(block.Text) || employees.includes(block.Text)) {
        let timeFrame = [];
        let time;
        if(isTimeFrame.test(block.Text)) {
          timeFrame = block.Text.split(" ");
          if (timeFrame[0] != undefined && timeFrame[2] != undefined) {
            time = timeFrame[0] + " - " + timeFrame[2];
          } else if (timeFrame[0] != undefined && timeFrame[2] == undefined) {
              time = timeFrame[0] + " - " + timeFrame[1];
            } else {
              needSecondTime = true;
            }
          } else {
            time = block.Text;
          }
        //console.log(`Text: ${block.Text}`)
        if(!needSecondTime) {
        weekFilled++;
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
            weekFilled = 0;
            break;
        }
        
      }

      }
    })
      
    } catch (error) {
      console.log(error);
    }

}



module.exports = detectText;