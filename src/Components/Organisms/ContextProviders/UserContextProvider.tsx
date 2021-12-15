import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ModuleModel } from '../../Molecules/Module/Module_model';
import {
  UserContextInterface,
  UserContextOrNull,
  UserInterface,
} from './interfaces';
import {
  updateModule,
  deleteModule,
  saveUserContextAs,
  clearLocalStorage,
} from './extensions';
import {
  LOCAL_STORAGE_ITEM_NAME,
  LOCAL_STORAGE_THROTTLE_WAIT,
  DEFAULT_USER_CONTEXT,
} from '../../../defaults';
import { throttle } from 'lodash';

export const UserContext = createContext<UserContextOrNull>(null);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const [editMode, setEditMode] = useState(DEFAULT_USER_CONTEXT.editMode);
  const [showEditButton, setShowEditButton] = useState(
    DEFAULT_USER_CONTEXT.showEditButton
  );
  const [invertTheme, setInvertTheme] = useState(
    DEFAULT_USER_CONTEXT.invertTheme
  );
  const [activeView, setActiveView] = useState(DEFAULT_USER_CONTEXT.activeView);
  const [views, setViews] = useState(DEFAULT_USER_CONTEXT.views);
  const [modules, setModules] = useState(DEFAULT_USER_CONTEXT.modules);
  const [inputName, setInputName] = useState(DEFAULT_USER_CONTEXT.inputName);
  const [outputName, setOutputName] = useState(DEFAULT_USER_CONTEXT.outputName);
  const [fileName, setFileName] = useState(DEFAULT_USER_CONTEXT.fileName);

  // eslint-disable-next-line
  const user = {
    editMode,
    showEditButton,
    invertTheme,
    activeView,
    views,
    modules,
    inputName,
    outputName,
    fileName,
  };

  const setters = {
    setEditMode,
    setShowEditButton,
    setInvertTheme,
    setActiveView,
    setViews,
    setModules,
    setInputName,
    setOutputName,
    setFileName,
  };

  function setState(storage: UserInterface) {
    setEditMode(storage.editMode);
    setShowEditButton(storage.showEditButton);
    setInvertTheme(storage.invertTheme);
    setActiveView(storage.activeView);
    setViews(storage.views);
    setModules(storage.modules);
    setInputName(storage.inputName);
    setOutputName(storage.outputName);
    setFileName(storage.fileName);
  }

  useEffect(() => {
    const storageItem = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || 'false'
    );
    if (storageItem) {
      setState(storageItem);
    }
    setIsInitialized(true);
    // cleanup
    return () => {
      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(user));
    };
    // eslint-disable-next-line
  }, []);

  const debounceMemo = useMemo(
    () =>
      throttle((user) => {
        localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(user));
      }, LOCAL_STORAGE_THROTTLE_WAIT),
    []
  );

  useMemo(
    () => isInitialized && debounceMemo(user),
    [user, isInitialized, debounceMemo]
  );

  const userContextProviderValue: UserContextInterface = {
    ...user,
    ...setters,
    updateModule: (id: number, module: ModuleModel) =>
      updateModule({ id, module, setModules, modules }),
    deleteModule: (id: number) => deleteModule({ id, setModules, modules }),
    saveUserContextAs: (fileName: string) =>
      saveUserContextAs({ fileName, user }),
    clearLocalStorage: () => {
      clearLocalStorage(LOCAL_STORAGE_ITEM_NAME);
      setState(DEFAULT_USER_CONTEXT);
    },
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
