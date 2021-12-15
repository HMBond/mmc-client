import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './View.css';
import { MidiButtonModel } from '../../Molecules/Module/Module_model';
import { UserContext } from '../..';
import { ViewModel } from './View_model';
import { AddModuleButton } from '../../';

type ViewProps = {
  children: React.ReactNode;
  view: ViewModel;
};

function View({ children, view }: ViewProps) {
  const { backgroundColor } = view;
  const { addModule } = useContext(UserContext)!;
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
      <AddModuleButton onClick={handleAddModuleClick} />
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
