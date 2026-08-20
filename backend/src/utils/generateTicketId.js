const Ticket = require('../models/Ticket');

const generateTicketId = async () => {
  const lastTicket = await Ticket.findOne().sort({ created_at: -1, _id: -1 });

  const lastNumber = lastTicket
    ? parseInt(lastTicket.ticket_id.split('-')[1], 10)
    : 0;

  const nextNumber = lastNumber + 1;
  return `TKT-${String(nextNumber).padStart(3, '0')}`;
};

module.exports = generateTicketId;
