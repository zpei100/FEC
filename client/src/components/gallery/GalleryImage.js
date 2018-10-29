import React, { Component } from 'react';

export default function GalleryImage ({idx, img}) {
  return <img className={idx} src={img} alt=""/>
}