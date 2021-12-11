import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [modules, setModules] = useState(new Map());
  const [views, setViews] = useState(new Map());
  const [editMode, setEditMode] = useState(true);
  const [activeView, setActiveView] = useState(0);

  const userContextProviderValue = {
    modules,
    setModules,
    views,
    setViews,
    editMode,
    setEditMode,
    activeView,
    setActiveView,
  };

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
