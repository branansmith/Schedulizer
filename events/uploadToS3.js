function uploadToS3(filePath) {
    var AWS = require("aws-sdk");
    AWS.config.update({ region: "us-east-1" });

    // Create S3 service object
    var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
    
    // call S3 to retrieve upload file to specified bucket
    //make sure name of bucket is correct
    var uploadParams = { Bucket: "canyouseeme15", Key: "", Body: "" };
    
    //put path of file here
    //the path is just this /Users/branansmith/Desktop/discord-bot/(filename)
    
    // Configure the file stream and obtain the upload parameters
    var fs = require("fs");
    var fileStream = fs.createReadStream(filePath);
    fileStream.on("error", function (err) {
      console.log("File Error", err);
    });
    uploadParams.Body = fileStream;
    var path = require("path");
    uploadParams.Key = path.basename(filePath);
    
    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Did not work");
        console.log("Error", err);
      }
      if (data) {
        console.log("Upload Success", data.Location);
      }
    });
    }

    module.exports = uploadToS3;