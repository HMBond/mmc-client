import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { DragEvent, MouseEvent, ReactNode, useState } from 'react';
import { AddButton, ModuleDialog, ModuleTypeMenu } from '../..';
import { useStateContext } from '../../../context';
import {
  ButtonModule,
  Module,
  ModuleInterface,
  ModuleType,
  SliderModule,
} from '../../../types/Module.types';
import { View as ViewModel, ViewPropTypes } from '../../../types/View.types';
import './View.css';

View.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  view: ViewPropTypes.isRequired,
};

type ViewProps = {
  children: ReactNode;
  view: ViewModel;
};

function View({ children, view }: ViewProps) {
  const [state, dispatch] = useStateContext();
  const { leftHanded, activeViewId } = state;
  const [showModuleTypeMenu, setShowModuleTypeMenu] = useState(false);
  const [freshModule, setFreshModule] = useState<ModuleInterface>(new Module({}));
  const [open, setOpen] = useState(false);

  function allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  function handleAddButtonClick(event: MouseEvent) {
    event.stopPropagation();
    setShowModuleTypeMenu(true);
  }

  function handleBackdropClick() {
    setShowModuleTypeMenu(false);
  }

  function handleModuleChoice(type: ModuleType) {
    switch (type) {
      case 'Button':
        setFreshModule(new ButtonModule());
        break;
      case 'Slider':
        setFreshModule(new SliderModule());
        break;
      case 'Settings':
        setFreshModule(new Module());
        break;
      default:
        break;
    }

    setOpen(true);
  }

  function handleCloseDialog() {
    setOpen(false);
  }

  function handleAddModuleSubmit(module: ModuleInterface) {
    dispatch({ type: 'ADD_MODULE', module });
    setOpen(false);
  }

  const { id, backgroundColor } = view;
  return (
    <>
      <div
        style={{ backgroundColor }}
        className={`view ${activeViewId !== id ? 'fade' : ''}`}
        onDrop={allowDrop}
        onDragOver={allowDrop}
        onClick={handleBackdropClick}
      >
        {children}
        <Box sx={{ m: '1rem', float: leftHanded ? 'none' : 'right' }}>
          {showModuleTypeMenu ? (
            <ModuleTypeMenu handleModuleChoice={handleModuleChoice} />
          ) : (
            <AddButton onClick={handleAddButtonClick} />
          )}
        </Box>
      </div>
      {freshModule && (
        <ModuleDialog
          open={open}
          onClose={handleCloseDialog}
          onSubmit={handleAddModuleSubmit}
          module={freshModule}
          add
        />
      )}
    </>
  );
}

export default View;
