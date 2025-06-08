const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicleType: { type: String, enum: ['car', 'bike', 'bus'], required: true },
  startTime: Date,
  endTime: Date,
  avgSpeed: Number,
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
