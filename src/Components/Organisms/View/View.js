import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../ContextProviders/UserContextProvider';
import './View.css';

function View({ children, pageNumber, label }) {
  const { activeView, views, setViews } = useContext(UserContext);

  useEffect(() => {
    setViews(views.set(pageNumber, label));
    // eslint-disable-next-line
  }, []);

  function allowDrop(even) {
    even.preventDefault();
  }

  function handleOnDrop(event) {
    event.preventDefault();
  }

  return (
    <div
      className="view"
      onDrop={handleOnDrop}
      onDragOver={allowDrop}
      active={(pageNumber === activeView).toString()}
    >
      {children}
    </div>
  );
}

View.propTypes = {
  pageNumber: PropTypes.number,
  label: PropTypes.string,
};

export default View;
