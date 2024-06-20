import React from 'react';
import errorImage from '../assets/image.png'

function Er404() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={errorImage} alt="Error 404" style={{ maxWidth: '80%'}} />
    </div>
  );
}

export default Er404;