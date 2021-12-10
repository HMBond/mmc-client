import React from 'react';
import './Carrousel.css';

function Carrousel({ children, activeView, viewCount }) {
  const style = {
    transform: `translateX(-${Math.ceil((activeView / viewCount) * 100)}%)`,
  };

  return (
    <div className="carrousel" style={style}>
      {children}
    </div>
  );
}

export default Carrousel;
