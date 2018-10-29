import React, { Component } from 'react';

export default function Captions({ imgs, carouselWidth, active }) {

  return (
    <ol class="carousel-indicators" id="Captions">

      {imgs.map((img, idx) => 
        <li data-target="#modal-carousel" data-slide-to="0" className={`${active === idx ? 'active' : ''} h-100 w-auto mx-2`}>
        <img
          className="d-block h-100 w-auto"
          src={img}
        />
      </li>
      )}
    </ol>
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
