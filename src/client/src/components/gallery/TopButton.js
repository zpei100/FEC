import React from 'react';

import { save, share } from '../../lib/svg';

export default function ({ type, updateFavorites, room, user }) {

  if (room && user) {
    const favorite = user.favorites.includes(room.id);
    const onClick = function() {
      updateFavorites(room.id);
    }
  
    return (
      <button className="btn btn-lg mx-2 py-1 button-text d-flex btn-light">
        <div className="mr-2 align-self-center">
          {type === 'share' ? share : save(favorite, onClick)}
        </div>
        <div className="hide-text" style={{ lineHeight: '25px' }}>
          {type}
        </div>
      </button>
    );
  } else return "";
}

