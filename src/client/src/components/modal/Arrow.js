import React from 'react';

import { next_arrow, prev_arrow } from '../../lib/svg';
import $ from 'jquery';

export default function Arrow({ type, handleCarouselTurn, isAnimating }) {
  return (
    <a
      className={`carousel-control-${type} carousel-arrows disabled`}
      href={isAnimating ? 'javascript:void(0)' : '#modal-carousel'}
      role='button'
      data-slide={type}
      onClick={() => {
        if(!isAnimating) { 
          handleCarouselTurn(type);
        } 
      }}
    >
      {type === 'next' ? next_arrow : prev_arrow}
    </a>
  );
}

