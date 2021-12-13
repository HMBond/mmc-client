import React, { createContext, useState, useEffect, useMemo } from 'react';
import defaultSetup from '../../../defaultSetup';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [isUseEffectFinished, setIsUseEffectFinished] = useState(false);
  const [modules, setModules] = useState(new Map());
  const [views, setViews] = useState(new Map());
  const [editMode, setEditMode] = useState(true);
  const [invertThemeMode, setInvertThemeMode] = useState(false);
  const [activeView, setActiveView] = useState(0);
  const [inputName, setInputName] = useState('');
  const [outputName, setOutputName] = useState('');

  const LOCAL_STORAGE_ITEM_NAME = 'midi-controller';

  // eslint-disable-next-line
  const user = {
    modules: Object.fromEntries(modules),
    views: Object.fromEntries(views),
    editMode,
    invertThemeMode,
    activeView,
    inputName,
    outputName,
  };

  useEffect(() => {
    let localStorageItem = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_ITEM_NAME)
    );
    // TODO: Use default setup for starting without local storage
    //if (!localStorageItem) localStorageItem = defaultSetup;
    setModules(new Map(Object.entries(localStorageItem.modules)));
    setViews(new Map(Object.entries(localStorageItem.views)));
    setEditMode(localStorageItem.editMode);
    setInvertThemeMode(localStorageItem.invertThemeMode);
    setActiveView(localStorageItem.activeView);
    setInputName(localStorageItem.inputName);
    setOutputName(localStorageItem.outputName);

    setIsUseEffectFinished(true);
    return () => {
      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(user));
    };
    // eslint-disable-next-line
  }, []);

  useMemo(() => {
    if (isUseEffectFinished)
      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(user));
  }, [user]);

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
