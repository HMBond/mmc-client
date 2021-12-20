import { useContext, ReactNode } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { UserContext } from '../..';
import './Nav.css';

type NavProps = {
  children: ReactNode;
};

function Nav({ children }: NavProps) {
  const { leftHanded } = useContext(UserContext)!;
  return (
    <AppBar
      position="static"
      className={`nav ${leftHanded ? 'row-reversed' : ''}`}
    >
      {children}
    </AppBar>
  );
}

Nav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Nav;
