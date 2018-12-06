const mongoose = require('mongoose');

mongoose.connect(`mongodb://zen:zenpai2@ds115664.mlab.com:15664/fec`, {
  useCreateIndex: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.once('open', function() {
  console.log('connection open!');
});

module.exports = { db }
