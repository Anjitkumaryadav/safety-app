const express = require('express');
const router = express.Router();
const { createAlert } = require('../controllers/alertController');

router.post('/create', createAlert);

module.exports = router;