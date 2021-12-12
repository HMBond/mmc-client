import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [modules, setModules] = useState(new Map());
  const [views, setViews] = useState(new Map());
  const [editMode, setEditMode] = useState(true);
  const [invertThemeMode, setInvertThemeMode] = useState(false);
  const [activeView, setActiveView] = useState(0);
  const [inputName, setInputName] = useState('');
  const [outputName, setOutputName] = useState('');

  const userContextProviderValue = {
    modules,
    setModules,
    views,
    setViews,
    editMode,
    setEditMode,
    invertThemeMode,
    setInvertThemeMode,
    activeView,
    setActiveView,
    inputName,
    setInputName,
    outputName,
    setOutputName,
  };

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
