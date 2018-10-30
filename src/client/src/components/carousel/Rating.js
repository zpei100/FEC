import React, { Component } from 'react';
import $ from 'jquery';

class Rating extends Component {
  componentDidMount() {
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

    var $stars = $(`#stars${this.props.roomId}`)[0].children;

    console.log($stars);
    console.log('the rating for this place is: ', rating)

    for (var i = 0; i < rating - 1; i++) {
      $($stars[i]).addClass(`${color}-star`);
      console.log($stars[i], 'for the room: ', this.props.roomId)
      console.log('same as before, but this time inside the for loop: ',  $stars)
    }

    if (rating !== Math.floor(rating))
      $($stars[Math.floor(rating)]).append(
        $(`<span class="half-${color}-star">&#x2605;</span>`)
      );
  }

  render() {
    return (
      <span className="mr-2" id={`stars${this.props.roomId}`}>
        {[1,2,3,4,5].map((key) => <span key={key} className="star-o">
          &#x2605;
        </span>)}
      </span>
    );
  }
}

export default Rating;
