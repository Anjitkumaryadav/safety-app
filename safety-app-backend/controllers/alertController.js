const Alert = require('../models/Alert');
const Ride = require('../models/Ride');
const User = require('../models/User');
const { sendSMS } = require('../utils/sendSMS');

exports.createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);

    const ride = await Ride.findById(alert.rideId);
    if (!ride) return res.status(404).json({ success: false, message: 'Ride not found' });

    const user = await User.findById(ride.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const smsText = `Emergency Alert for ${user.name}! Possible accident detected.\nLocation: https://www.google.com/maps?q=${alert.location.lat},${alert.location.lng}`;

    await sendSMS({ to: user.emergency1, message: smsText });
    await sendSMS({ to: user.emergency2, message: smsText });

    console.log("alert send", user.emergency1, smsText,user.emergency2 )
    res.status(201).json({ success: true, alert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
