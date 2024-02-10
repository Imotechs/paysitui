import React from 'react';
import './Slideshow.css'; // Import the CSS for styling

const Slideshow = ({images}) => {
    const slider = [images.map((image, index) => (
        <div key={index} className="slide">
        <img src={image} alt={`Slide ${index + 1}`} />
        </div>
))]
  return (

    <div className="slideshow-container">
        {slider}
    </div>
  );
};

export default Slideshow;
