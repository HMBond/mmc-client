import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import { View } from '../../../types/View.types';
import './Carrousel.css';

Carrousel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  activeViewId: PropTypes.number.isRequired,
  views: PropTypes.array,
};

type CarrouselProps = {
  children: ReactNode;
  activeViewId: number;
  views: View[];
};

function Carrousel({ children, activeViewId, views }: CarrouselProps) {
  const activeView = views.find((view) => view.id === activeViewId);
  if (!activeView) throw new Error('Could not find activeView');
  const style =
    activeView && views
      ? {
          transform: `translateX(-${(views.indexOf(activeView) * 100) / views.length}%)`,
        }
      : {};

  return (
    <div className="carrousel">
      <div className="carrousel__content" style={style}>
        {children}
      </div>
    </div>
  );
}

export default Carrousel;
