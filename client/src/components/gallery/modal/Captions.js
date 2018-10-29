import React, { Component } from 'react';

export default function Captions({ imgs, carouselWidth, active }) {

  return (
    <div id="Captions" className="container-fluid">
      <div style={{width: `${carouselWidth}px`, overflow: 'hidden', position: 'relative' }} className="container h-100 p-0">
        <ol class="carousel-indicators justify-content-start h-100">
          {imgs.map((img, idx) => (
            <li
              data-target="#modal-carousel"
              data-slide-to="0"
              className={`${active === idx ? 'active' : ''} h-100 w-auto mx-2`}
              style={{ position: 'relative' }}
            >
              <img className="d-block h-100 w-auto" src={img} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/*
<div id="Captions" className="container-fluid">
      <div style={{ width: `${carouselWidth}px`, overflow: 'hidden' }} className="m-auto">
        <div id="caption-text">CAPTIONS TEXT AND STUFF</div>
        <div id="caption-slides" className="d-flex flex-nowrap">
          {imgs.map((img, idx) => (
            <img key={idx} src={img} alt="" id={`caption-img-${idx}`} className="h-100 w-auto mx-1" />
          ))}
        </div>
      </div>
    </div>
*/
