const express = require('express');
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
} = require('../controllers/ticketController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('image'), createTicket);
router.get('/', getTickets);
router.get('/:ticket_id', getTicketById);
router.put('/:ticket_id', updateTicket);

module.exports = router;
