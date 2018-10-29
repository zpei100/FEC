import React, { Component } from 'react';

import { exit } from '../../../lib/svg';

export default function ExitBtn({ handleCloseModal }) {
  return (
    <div id="ExitBtn">
      <button id="exit-button" onClick={handleCloseModal}>
        {exit}
      </button>
    </div>
  );
}
