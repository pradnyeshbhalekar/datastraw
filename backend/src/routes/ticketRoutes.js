const express = require('express');
const { createTicket, getTickets } = require('../controllers/ticketController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('image'), createTicket);
router.get('/', getTickets);

module.exports = router;
