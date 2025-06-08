const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
  location: {
    lat: Number,
    lng: Number
  },
  voiceNoteUrl: String,
  isSent: { type: Boolean, default: false },
  cancelledByUser: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
