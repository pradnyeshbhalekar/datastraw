const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  note_text: { type: String, required: true },
  author: {type:String},
  created_at: { type: Date, default: Date.now },
});

const ticketSchema = new mongoose.Schema(
  {
    ticket_id: { type: String, required: true, unique: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true,
      lowercase: true,
      trim: true,
      match:[/^\S+@\S+\.\S+$/, 'Invalid email format']
     },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open',
    },
    image_url: { type: String },
    notes: [noteSchema],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
