import React, { Component } from 'react';

export default function ViewPhotos({ handleOpenModal }) {
  return (
    <button
      onClick={handleOpenModal}
      className="btn btn-lg py-1 button-text btn-light"
    >
      View Photos
    </button>
  );
}
