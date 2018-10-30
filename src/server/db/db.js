const mongoose = require('mongoose');

mongoose.connect(`mongodb://admin:password2@ds139523.mlab.com:39523/fec`, {
  useCreateIndex: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.once('open', function() {
  console.log('connection open!');
});

module.exports = { db }
