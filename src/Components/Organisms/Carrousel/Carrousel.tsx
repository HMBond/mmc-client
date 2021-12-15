import React from 'react';
import PropTypes from 'prop-types';
import { ViewModel } from '../View/View_model';
import './Carrousel.css';

type CarrouselProps = {
  children: React.ReactNode;
  activeView: ViewModel;
  views: ViewModel[];
};

function Carrousel({ children, activeView, views }: CarrouselProps) {
  const style = {
    transform: `translateX(-${Math.ceil(
      (activeView.place / views.length) * 100
    )}%)`,
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
