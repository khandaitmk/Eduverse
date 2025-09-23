import React from "react";
import StarRatings from "react-star-ratings";

function RatingStars({ rating }) {
  return (
    <div>
      <StarRatings
        rating={rating}          // current rating value (e.g., 3.5)
        starRatedColor="gold"    // filled star color
        starEmptyColor="lightgray" // empty star color
        numberOfStars={5}        // total stars
        name="course-rating"     // name (required, unique if multiple ratings on page)
        starDimension="20px"     // size of each star
        starSpacing="3px"        // space between stars
      />
    </div>
  );
}

export default RatingStars;
