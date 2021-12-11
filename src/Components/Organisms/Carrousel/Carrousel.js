import React from 'react';
import './Carrousel.css';

function Carrousel({ children, activeView, viewCount }) {
  const style = {
    transform: `translateX(-${Math.ceil((activeView / viewCount) * 100)}%)`,
  };

  return (
    <div className="carrousel">
      <div className="carrousel__content" style={style}>
        {children}
      </div>
    </div>
  );
}

export default Carrousel;
