import React from 'react';
import errorImage from '../../public/ERROR404.png'; // Import the image

export default function NotFound() {
  return (
    <div>
      {/* <h1>Not found</h1> */}
      <img src={errorImage} alt="Error 404" /> {/* Use the imported image */}
    </div>
  );
}
