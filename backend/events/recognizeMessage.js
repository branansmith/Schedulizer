//updated bot on developer portal to allow message content intent
const {detectText} = require('./DetectText.js');
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

		messageAttributes.forEach((entry) => {
		if (entry.name.endsWith('.jpg') || entry.name.endsWith('.png') || entry.name.endsWith('pdf')) {
			let filePath = `/Users/branansmith/Desktop/discord-bot/backend/${entry.name}`;
			let entryUrl = entry.url;

			const writeStream = fs.createWriteStream(entry.name);

			request.get(entryUrl)
			.on('error', console.error)
			.pipe(writeStream);
			
			writeStream.on('finish', async () => {
				try {
				  await uploadToS3(filePath).then(() => detectText(entry.name)).then(() => fs.unlinkSync(filePath));
				} catch (error) {
				  console.error('Error uploading file to S3:', error);
				}
			  });

		}
		});
		
		


		
	},
};