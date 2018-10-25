const db = require('./db.js');
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  type: String,
  description: String,
  beds: Number,
  tag: String,
  favorite: Boolean,
  price: Number,
  rating: Number,
  reviews: Number,
  thumbNail: String,
  imgs: [String],
  related: [Number]
});

const Room = mongoose.model('Rooms', roomSchema);

module.exports = { Room };
