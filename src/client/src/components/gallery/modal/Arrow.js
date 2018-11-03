import React from 'react';

import { next_arrow, prev_arrow } from '../../../lib/svg';
import $ from 'jquery';

export default function Arrow({ type, handleCarouselTurn, animationDuration }) {
  return (
    <a
      className={`carousel-control-${type} carousel-arrows`}
      href="#modal-carousel"
      role="button"
      data-slide={type}
      onClick={(e) => {
        const self = $(e.target)[0]
        $(self).toggleClass('disabled');
        setTimeout(() => {
          $(self).toggleClass('disabled');
        })
        handleCarouselTurn(type)
      }}
    >
      {type === 'next' ? next_arrow : prev_arrow}
    </a>
  );
}
