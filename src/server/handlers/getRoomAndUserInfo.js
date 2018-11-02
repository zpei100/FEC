import { Room, User } from '../db/schema';

export const getRoomAndUserInfo = function(req) {
  return new Promise(function(resolve, reject) {
    
    const userId = req.session.user ? req.session.user : 15;

  try {
    const id = parseInt(req.params.id);

    Room.find({ id }).then(rooms => {
      const room = rooms[0]
      let relatedListings = [];
      const related = room.related;

      related.forEach((id) => {
        Room.find({ id }).then(relatedRooms => {
          const relatedRoom = relatedRooms[0]
          relatedListings.push(relatedRoom);

          if (relatedListings.length === related.length) {
            User.find({ id: userId }).then(users => {
              const { favorites, id, username } = users[0];
              var user = {favorites, id, username }

              resolve({room, relatedListings, user} )
            }).catch(reject);
          }
        }).catch(reject);
      });
    });
  } catch(e) {
      reject(e)
    }
  })
}