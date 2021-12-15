import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ModuleModel } from '../../Molecules/Module/Module_model';
import { UserInterface } from './interfaces';
import { deleteModule, saveUserContextAs, updateModule } from './extensions';
import {
  LOCAL_STORAGE_ITEM_NAME,
  LOCAL_STORAGE_THROTTLE_WAIT,
  DEFAULT_USER_CONTEXT,
} from '../../../defaults';
import { throttle } from 'lodash';

export const UserContext = createContext<UserInterface>(DEFAULT_USER_CONTEXT);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const [modules, setModules] = useState(DEFAULT_USER_CONTEXT.modules);
  const [views, setViews] = useState(DEFAULT_USER_CONTEXT.views);
  const [editMode, setEditMode] = useState(DEFAULT_USER_CONTEXT.editMode);
  const [showEditButton, setShowEditButton] = useState(
    DEFAULT_USER_CONTEXT.showEditButton
  );
  const [invertTheme, setInvertTheme] = useState(
    DEFAULT_USER_CONTEXT.invertTheme
  );
  const [activeView, setActiveView] = useState(DEFAULT_USER_CONTEXT.activeView);
  const [inputName, setInputName] = useState(DEFAULT_USER_CONTEXT.inputName);
  const [outputName, setOutputName] = useState(DEFAULT_USER_CONTEXT.outputName);
  const [fileName, setFileName] = useState(DEFAULT_USER_CONTEXT.fileName);

  // eslint-disable-next-line
  const user = {
    editMode,
    showEditButton,
    invertTheme,
    activeView,
    inputName,
    outputName,
    fileName,
    views,
    modules,
  };

  const setters = {
    setModules,
    setViews,
    setEditMode,
    setShowEditButton,
    setInvertTheme,
    setActiveView,
    setInputName,
    setOutputName,
    setFileName,
  };

  function setStorageToState(storage: UserInterface) {
    setEditMode(storage.editMode);
    setShowEditButton(storage.showEditButton);
    setInvertTheme(storage.invertThem);
    setActiveView(storage.activeView);
    setInputName(storage.inputName);
    setOutputName(storage.outputName);
    setViews(storage.views);
    setModules(storage.modules);
  }

  useEffect(() => {
    const localStorageItem = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || 'null'
    );
    if (localStorageItem) {
      setStorageToState(localStorageItem);
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

  const userContextProviderValue: UserInterface = {
    ...user,
    ...setters,
    updateModule: (id: number, module: ModuleModel) =>
      updateModule({ id, module, setModules, modules }),
    deleteModule: (id: number) => deleteModule({ id, setModules, modules }),
    saveUserContextAs: (fileName: string) =>
      saveUserContextAs({ fileName, user }),
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
