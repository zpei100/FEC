import React from 'react';

export default function GalleryImage ({idx, img, handleImageClick}) {
  return <img className={idx} src={img} alt="" onClick={handleImageClick} />
}