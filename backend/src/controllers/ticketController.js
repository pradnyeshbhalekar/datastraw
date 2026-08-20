const Ticket = require('../models/Ticket');
const generateTicketId = require('../utils/generateTicketId');

const createTicket = async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;

    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const ticket_id = await generateTicketId();

    const ticket = await Ticket.create({
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
    });

    res.status(201).json({
      ticket_id: ticket.ticket_id,
      created_at: ticket.created_at,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTickets = async (req, res) => {
  try {
    const {status, search} = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        {ticket_id: regex},
        {customer_name: regex},
        {customer_email: regex},
        {description: regex},
      ];
    }

    const tickets = await Ticket.find(filter)
      .sort({created_at: -1})
      .select('ticket_id customer_name subject status created_at -_id');

    res.json(tickets);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

module.exports = { createTicket, getTickets };
