const { Room } = require('./schema');

const dummyImageUrl =
  'https://st.hzcdn.com/fimgs/e6b10d680980a41a_8368-w521-h304-b0-p0--traditional-family-room.jpg';

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

const size = 50;

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
    if (position <= size) related.push(position);
  }

  for (var k = 0; k < random(10) + 10; k++) {
    imgs.push(`https://picsum.photos/333/222/?image=${random(999)}`);
  }

  new Room({
    ...roomData,
    id: i,
    beds: random(4) + 2,
    price: random(500),
    rating: random(6),
    reviews: random(200),
    related,
    imgs
  }).save();
}
