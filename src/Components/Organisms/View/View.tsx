import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './View.css';
import { MidiButtonModel } from '../../Molecules/Module/Module_model';
import { UserContext } from '../..';
import { ViewModel } from './View_model';
import { AddButton } from '../../';
import { Box } from '@mui/material';

type ViewProps = {
  children: React.ReactNode;
  view: ViewModel;
};

function View({ children, view }: ViewProps) {
  const { backgroundColor } = view;
  const { addModule, leftHanded, activeView } = useContext(UserContext)!;
  function allowDrop(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleAddModuleClick() {
    const position = {
      x: 0.8 * window.innerWidth,
      y: 0.15 * window.innerHeight,
    };
    const module = new MidiButtonModel({
      label: 'button 1',
      position,
      channel: 1,
      note: 'C3',
      velocity: 64,
    });
    addModule(view, module);
  }

  return (
    <div
      style={{ backgroundColor }}
      className={`view ${activeView.id === view.id ? '' : 'fade'}`}
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      <Box sx={{ m: '1rem', float: leftHanded ? 'none' : 'right' }}>
        <AddButton onClick={handleAddModuleClick} />
      </Box>
      {children}
    </div>
  );
}

View.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  backgroundColor: PropTypes.string,
};

export default View;
