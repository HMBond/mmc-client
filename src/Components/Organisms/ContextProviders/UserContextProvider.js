import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { deleteModule, updateModule } from './UserContextProvider_extensions';

const LOCAL_STORAGE_ITEM_NAME = 'midi-controller';
const DEFAULT_VIEW = {
  id: 0,
  label: 'Example',
  backgroundColor: '#000000',
  place: 1, // placement of view and view button
  modules: [0], // list of module ids to render within the view
};
const DEFAULT_MODULES = [
  {
    id: 0,
    type: 'button',
    label: 'volume',
    channel: null, // defaults to 1
    note: 'C3',
    velocity: null, // defaults to 64
  },
];

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [isUseEffectFinished, setIsUseEffectFinished] = useState(false);

  const [modules, setModules] = useState(DEFAULT_MODULES);
  const [views, setViews] = useState([DEFAULT_VIEW]);
  const [editMode, setEditMode] = useState(true);
  const [invertThemeMode, setInvertThemeMode] = useState(false);
  const [activeView, setActiveView] = useState(DEFAULT_VIEW);
  const [inputName, setInputName] = useState('');
  const [outputName, setOutputName] = useState('');

  // eslint-disable-next-line
  const user = {
    editMode,
    invertThemeMode,
    activeView,
    inputName,
    outputName,
    views,
    modules,
  };

  useEffect(() => {
    let localStorageItem = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_ITEM_NAME)
    );
    if (localStorageItem) {
      setModules(localStorageItem.modules);
      setViews(localStorageItem.views);
      setEditMode(localStorageItem.editMode);
      setInvertThemeMode(localStorageItem.invertThemeMode);
      setActiveView(localStorageItem.activeView);
      setInputName(localStorageItem.inputName);
      setOutputName(localStorageItem.outputName);
    }

    setIsUseEffectFinished(true);
    return () => {
      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(user));
    };
    // eslint-disable-next-line
  }, []);

  useMemo(() => {
    if (isUseEffectFinished)
      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(user));
  }, [user, isUseEffectFinished]);

  const userContextProviderValue = {
    modules,
    setModules,
    updateModule: (module, newModule) =>
      updateModule({ module, newModule, setModules, modules }),
    deleteModule: (module) => deleteModule({ module, setModules, modules }),
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

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UserContextProvider;
