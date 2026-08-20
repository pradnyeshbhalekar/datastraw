const express = require('express');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tickets', ticketRoutes);

module.exports = app;
