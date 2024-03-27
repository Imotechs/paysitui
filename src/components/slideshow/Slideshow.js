import React from 'react';
import './Slideshow.css'; // Import the CSS for styling

const Slideshow = ({images}) => {
    const slider = [images.map((image, index) => (
        
        <img src={image} alt={`Slide ${index + 1}`}  key={index} className="slide"/>
))]
let slideList = slider
setTimeout(()=>{
slideList =slider
},2000)
  return (

    <div className="slideshow-container">
        {slider}
    </div>
  );
};

export default Slideshow;
