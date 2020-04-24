require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create(messageToSend)
//   .then(message => console.log(message.sid));

module.exports = client;