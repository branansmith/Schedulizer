//updated bot on developer portal to allow message content intent
const detectText = require('./DetectText.js');
const uploadToS3 = require('./uploadToS3.js');

const { Events } = require('discord.js');


const fs = require('fs');
const request = require('request');

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});



module.exports = {
	name: Events.MessageCreate,
	execute(message) {
		const messageAttributes = message.attachments;

		//after downloading the file, need to get the path of that file
		//that was just downloaded
		messageAttributes.forEach((entry) => {
		if (entry.name.endsWith('.jpg') || entry.name.endsWith('.png') || entry.name.endsWith('pdf')) {
			let filePath = `/Users/branansmith/Desktop/discord-bot/${entry.name}`;
			let entryUrl = entry.url;

			const writeStream = fs.createWriteStream(entry.name);

			request.get(entryUrl)
			.on('error', console.error)
			.pipe(writeStream);
			//uploads to s3
			//if file is already in there, i believe it overrides it
			
			writeStream.on('finish', async () => {
				try {
				  // Wait for the upload to complete
				  await uploadToS3(filePath);
			  
				  // Now call detectText after a 5-second delay
				  setTimeout(() => {
					fs.unlinkSync(filePath);
					detectText(entry.name);
				  }, 4000);
				} catch (error) {
				  console.error('Error uploading file to S3:', error);
				}
			  });//needs to wait until file is uploaded to s3
			
			//deletes file from local directory
			

			//downloads file -> sends to amazon textract -> extracts data
			// -> use data on 'whattimedoiworktoday' website -> deletes file from 
			//directory to prevent unneeded storage us
		} else {
			console.log('not a photo');
		}
		});
		
		


		
	},
};