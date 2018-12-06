import React, { Component } from 'react';

class Rating extends Component {

  render() {
    var color = this.props.color;
    var rating = this.props.rating;
    var floor = Math.floor(rating);
    var ceil = Math.ceil(rating);
    var middle = (floor + ceil) / 2;

    rating =
      rating <= middle
        ? rating - floor <= middle - rating
          ? floor
          : middle
        : rating - middle <= ceil - rating
          ? middle
          : ceil;
    
    var getColor = function(key) {
      if (key < rating) return color;
      else return 'grey';
    }

    return (
      <span className="mr-2" id={`stars${this.props.roomId}`}>
        {[1, 2, 3, 4, 5].map(key => (
          <span key={key}
            style={{
              color: getColor(key),
            }}
          >
            &#x2605;
          </span>
        ))}
      </span>
    );
  }
}

export default Rating;