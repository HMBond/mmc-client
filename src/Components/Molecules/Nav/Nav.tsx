import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { useStateContext } from '../../../context';
import './Nav.css';

type NavProps = {
  children: ReactNode;
};

function Nav({ children }: NavProps) {
  const { state } = useStateContext();
  return (
    <AppBar position="static" className={`nav ${state.leftHanded ? 'row-reversed' : ''}`}>
      {children}
    </AppBar>
  );
}

Nav.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Nav;
