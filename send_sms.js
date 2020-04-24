require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Thank you for registration at Global Life',
    from: '+12055707505',
    to: '+14158665819'
  })
  .then(message => console.log(message.sid));
