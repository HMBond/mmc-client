import { useContext, MouseEvent, DragEvent, ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import './View.css';
import {
  ButtonModule,
  Module,
  ModuleInterface,
  ModuleType,
  SliderModule,
} from '../../../models/modules';
import { ModuleDialog, ModuleTypeMenu, UserContext } from '../..';
import { View as ViewModel } from '../../../models/view';
import { AddButton } from '../..';
import { Box } from '@mui/material';

View.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  view: PropTypes.shape({
    id: PropTypes.number,
    backgroundColor: PropTypes.string,
  }).isRequired,
};

type ViewProps = {
  children: ReactNode;
  view: ViewModel;
};

function View({ children, view }: ViewProps) {
  const { backgroundColor } = view;
  const { addModule, leftHanded, activeView } = useContext(UserContext) || {};
  const [showModuleTypeMenu, setShowModuleTypeMenu] = useState(false);
  const [freshModule, setFreshModule] = useState<ModuleInterface>(
    new Module({})
  );
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
    addModule && addModule(view, module);
    setOpen(false);
  }

  return (
    <>
      <div
        style={{ backgroundColor }}
        className={`view ${activeView?.id !== view.id ? 'fade' : ''}`}
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
