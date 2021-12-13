import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { deleteModule, updateModule } from './UserContextProvider_extensions';
import {
  View,
  Module,
  UserContextInterface,
} from './UserContextProvider_interfaces';

const LOCAL_STORAGE_ITEM_NAME: string = 'midi-controller-user-setup';
const DEFAULT_VIEW: View = {
  id: 0,
  label: 'Example',
  backgroundColor: 'black',
  place: 0,
  moduleIds: [0, 1],
};

const DEFAULT_MODULES: Module[] = [
  {
    id: 0,
    type: 'button',
    label: 'volume',
    channel: null, // defaults to 1
    note: 'C3', // must unique per channel
    velocity: null, // defaults to 64
  },
  {
    id: 1,
    type: 'slider',
    label: 'volume',
    channel: 16, // must be unique
    orientation: null, // defaults to 'vertical'
  },
];

export const UserContext = createContext<UserContextInterface | null>(null);

const UserContextProvider = ({ children }: { children: any }) => {
  const [isUseEffectFinished, setIsUseEffectFinished] = useState(false);

  const [modules, setModules] = useState<Module[]>(DEFAULT_MODULES);
  const [views, setViews] = useState([DEFAULT_VIEW]);
  const [editMode, setEditMode] = useState(false);
  const [invertThemeMode, setInvertThemeMode] = useState(false);
  const [activeView, setActiveView] = useState(DEFAULT_VIEW);
  const [inputName, setInputName] = useState('');
  const [outputName, setOutputName] = useState('');

  // eslint-disable-next-line
  const user: UserContextInterface = {
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
      localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || 'null'
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
    if (isUseEffectFinished) {
      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(user));
    }
  }, [user, isUseEffectFinished]);

  const userContextProviderValue: UserContextInterface = {
    modules,
    setModules,
    updateModule: (module: Module) =>
      updateModule({ module, setModules, modules }),
    deleteModule: (module: Module) =>
      deleteModule({ module, setModules, modules }),
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
