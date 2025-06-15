const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const client = require('twilio')(accountSid, authToken);

exports.sendSMS = async ({ to, message }) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: twilioPhone,
      to,
    });
    console.log('SMS sent! SID:', res.sid,message,twilioPhone, to);
  } catch (error) {
    console.error('Error sending SMS:', error.message);
  }
};
