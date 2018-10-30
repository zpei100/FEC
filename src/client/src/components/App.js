import React from 'react';
import RelatedListings from './carousel/RelatedListings';
import Gallery from './gallery/Gallery';

const App = function() {

  return (
    <div>
      <div style={{ height: '80px' }} />
      {<Gallery />}
      <div style={{ height: '300px' }} />
      {<RelatedListings />}
    </div>
  );
};

export default App;
