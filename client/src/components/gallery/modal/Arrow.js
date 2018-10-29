import React, { Component } from 'react';

import { next_arrow, prev_arrow } from '../../../lib/svg';

export default function Arrow({ type, handleCarouselTurn }) {
  return (
    <a
      className={`carousel-control-${type} carousel-arrows`}
      href="#modal-carousel"
      role="button"
      data-slide={type}
      onClick={() => handleCarouselTurn(type)}
    >
      {type === 'next' ? next_arrow : prev_arrow}
    </a>
  );
}
