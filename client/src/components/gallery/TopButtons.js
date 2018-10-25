import React, { Component } from 'react';

class TopButtons extends Component {
  render() {
    return (
      <div>
        <div className="button-top button mx-4 my-4">
          <button className="btn mx-3 py-1 button-text">Share</button>
          <button className="btn py-1 button-text">Save</button>
        </div>
        <div className="button-bottom button mx-4 my-4">
          <button className="btn py-1 button-text">View Photos</button>
        </div>
      </div>
    );
  }
}

export default TopButtons;