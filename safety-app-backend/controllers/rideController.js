const Ride = require('../models/Ride');

exports.startRide = async (req, res) => {
  try {
    const ride = await Ride.create({ ...req.body, startTime: new Date() });
    res.status(201).json({ success: true, ride });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.endRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(req.body.rideId, {
      endTime: new Date()
    }, { new: true });
    res.status(200).json({ success: true, ride });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};