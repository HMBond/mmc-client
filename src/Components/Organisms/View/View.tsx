import { useContext, MouseEvent, DragEvent, ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import './View.css';
import { ModuleInterface, ModuleType } from '../../../types/modules';
import { ModuleDialog, ModuleTypeSelector, UserContext } from '../..';
import { View as ViewModel } from '../../../types/view';
import { AddButton } from '../..';
import { Box } from '@mui/material';

type ViewProps = {
  children: ReactNode;
  view: ViewModel;
};

function View({ children, view }: ViewProps) {
  const { backgroundColor } = view;
  const { addModule, leftHanded, activeView } = useContext(UserContext) || {};
  const [showModuleTypeSelector, setShowModuleTypeSelector] = useState(false);
  const [moduleType, setModuleType] = useState<ModuleType>();
  const [open, setOpen] = useState(false);

  function allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  function handleAddButtonClick(event: MouseEvent) {
    event.stopPropagation();
    setShowModuleTypeSelector(true);
  }

  function handleBackdropClick() {
    setShowModuleTypeSelector(false);
  }

  function handleModuleChoice(type: ModuleType) {
    setModuleType(type);
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
        <Box sx={{ m: '1rem', float: leftHanded ? 'none' : 'right' }}>
          {showModuleTypeSelector ? (
            <ModuleTypeSelector handleModuleChoice={handleModuleChoice} />
          ) : (
            <AddButton onClick={handleAddButtonClick} />
          )}
        </Box>
        {children}
      </div>
      {moduleType && (
        <ModuleDialog
          open={open}
          type={moduleType}
          onClose={handleCloseDialog}
          onSubmit={handleAddModuleSubmit}
        />
      )}
    </>
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
