const express = require('express');
const router = express.Router();
const { startRide, endRide } = require('../controllers/rideController');

router.post('/start', startRide);
router.post('/end', endRide);

module.exports = router;