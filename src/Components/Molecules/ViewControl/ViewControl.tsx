import { useState } from 'react';
import { AddButton, ViewActions, ViewDialog } from '../..';
import { View } from '../../../types/View.types';
import { useStateContext } from '../../contextProviders/context';
import './ViewControl.css';

function ViewControl() {
  const [state, dispatch] = useStateContext();

  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  function handleViewButtonClick(view: View) {
    dispatch({ type: 'SET_ACTIVE_VIEW_ID', value: view.id });
  }

  function handleAddClick() {
    setViewDialogOpen(true);
  }

  function handleSubmit(view: View) {
    dispatch({ type: 'ADD_VIEW', view });
    setViewDialogOpen(false);
  }

  function handleClose() {
    setViewDialogOpen(false);
  }

  const { views, editMode, activeViewId } = state;

  return (
    <div className="view-control">
      {views &&
        views.map((view) => {
          return (
            <div className="viewControl__button-wrapper" key={view.id}>
              <button
                className={activeViewId === view.id ? 'active' : ''}
                onClick={() => handleViewButtonClick(view)}
              >
                {view.label}
              </button>
              {editMode && <ViewActions view={view} />}
            </div>
          );
        })}
      {editMode && <AddButton onClick={handleAddClick} />}
      <ViewDialog
        open={viewDialogOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        add
        view={new View()}
      />
    </div>
  );
}

export default ViewControl;
