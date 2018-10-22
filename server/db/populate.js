const { Room } = require('./schema');

const dummyImageUrl =
  'https://st.hzcdn.com/fimgs/e6b10d680980a41a_8368-w521-h304-b0-p0--traditional-family-room.jpg';

const data = {
  type: ['ENTIRE CONDOMINIUM', 'ENTIRE APARTMENT', 'ENTIRE VILLA'],
  description: ['some description'],
  tag: ['PLUS', 'REGULAR'],
  favorite: [true, false],
  img: [dummyImageUrl]
};

const random = function(len) {
  return Math.floor(Math.random() * len);
};

const randomlyPick = function(prop) {
  const len = data[prop].length;
  return data[prop][random(len)];
};

const size = 20;

for (var i = 0; i < size; i++) {
  var roomData = {};
  for (var key in data) {
    roomData[key] = randomlyPick(key);
  }

  var related = [];
  var position = 0;
  
  while (position < size) {
    position += random(Math.floor(size/5));
    related.push(position)
  }

  new Room({
    ...roomData,
    id: i,
    beds: random(6),
    price: random(500),
    rating: random(6),
    reviews: random(200),
    related
  }).save();
}
