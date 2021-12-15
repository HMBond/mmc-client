import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './View.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { MidiButtonModel } from '../../Molecules/Module/Module_model';
import { UserContext } from '../..';
import { ViewModel } from './View_model';

type ViewProps = {
  children: React.ReactNode;
  view: ViewModel;
};

function View({ children, view }: ViewProps) {
  const { backgroundColor } = view;
  const { addModule, editMode } = useContext(UserContext)!;
  function allowDrop(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleAddModuleClick() {
    const position = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
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
      className="view"
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      {editMode && (
        <Fab onClick={handleAddModuleClick} sx={{ m: '1rem' }}>
          <AddIcon />
        </Fab>
      )}
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
