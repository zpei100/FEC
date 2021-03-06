const { Room, User } = require('./schema');

const data = {
  type: ['ENTIRE CONDOMINIUM', 'ENTIRE APARTMENT', 'ENTIRE VILLA'],
  description: [
    'City Home in Historic Rocks',
    'Luxury waterfront & amazing views',
    'In The Heart of  Sydney SBD! WIFI',
    'Charming Urban Sanctuary in a Heritage Terrace',
    'Harbour Views Massive apartment',
    '2BR beachview nr Icebergs w parking',
    '143 fantastic apartment 10 minutes walk to city.',
    'Harbour Front Accommodation'
  ],
  tag: ['PLUS', 'REGULAR'],
  favorite: [true, false]
};

const random = function(len) {
  return Math.floor(Math.random() * len);
};

const randomlyPick = function(prop) {
  const len = data[prop].length;
  return data[prop][random(len)];
};

const size = 100;

for (var i = 0; i < size; i++) {
  var roomData = {};
  for (var key in data) {
    roomData[key] = randomlyPick(key);
  }

  var related = [];
  var position = 0;
  var imgs = [];

  while (position < size) {
    position += random(Math.floor(size / 5)) + 1;
    if (position < size) related.push(position);
  }

  for (var k = 0; k < random(10) + 10; k++) {
    imgs.push(`https://picsum.photos/666/444/?image=${random(999)}`);
  }

  new Room({
    ...roomData,
    id: i,
    beds: random(4) + 2,
    price: random(500),
    rating: Math.random() * 5,
    reviews: random(200),
    related,
    imgs
  }).save();
}

new User({
  id: 15,
  username: 'Adam',
  email: 'adam@gmail.com',
  favorites: [1, 5, 8, 13, 28, 29, 47]
}).save();