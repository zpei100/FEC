const db = require('./db.js');
const mongoose = require('mongoose');

const roomSchema  = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  type: String,
  descriptin: String,
  beds: Number,
  tag: String,
  favorite: Boolean,
  price: Number,
  rating: Number,
  reviews: Number,
  img: String,
  related: [Number]
});

const Room = mongoose.model('Person', roomSchema);

module.exports = { Room } 
