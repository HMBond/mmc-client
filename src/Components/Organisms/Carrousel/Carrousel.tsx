import React from 'react';
import PropTypes from 'prop-types';
import { View } from '../../../Types/View';
import './Carrousel.css';

type CarrouselProps = {
  children: React.ReactNode;
  activeView: View;
  views: View[];
};

function Carrousel({ children, activeView, views }: CarrouselProps) {
  const style = {
    transform: `translateX(-${((activeView.place - 1) * 100) / views.length}%)`,
  };

  return (
    <div className="carrousel">
      <div className="carrousel__content" style={style}>
        {children}
      </div>
    </div>
  );
}

Carrousel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  activeView: PropTypes.shape({
    place: PropTypes.number,
  }).isRequired,
  views: PropTypes.array,
};

export default Carrousel;
