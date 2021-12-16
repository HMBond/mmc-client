import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
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
  addModule,
  addView,
  updateView,
} from './extensions';
import {
  LOCAL_STORAGE_ITEM_NAME,
  LOCAL_STORAGE_THROTTLE_WAIT,
  DEFAULT_USER_CONTEXT,
} from '../../../definitions';
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
  const [leftHanded, setLeftHanded] = useState(DEFAULT_USER_CONTEXT.leftHanded);
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
    leftHanded,
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
    setLeftHanded,
    setActiveView,
    setViews,
    setModules,
    setInputName,
    setOutputName,
    setFileName,
  };

  function setState(user: UserInterface, setters: Object) {
    for (const key in setters) {
      const name = key.slice(3);
      const camelCaseName = name.slice(0, 1).toLowerCase() + name.slice(1);
      // @ts-ignore-next-line
      setters[key](user[camelCaseName]);
    }
  }

  useEffect(() => {
    const storageItem = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || 'false'
    );
    if (storageItem) {
      setState(storageItem, setters);
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
    addModule: (view, module) => {
      addModule({ module, setModules, modules });
      const updatedView = view;
      updatedView.moduleIds.push(module.id);
      updateView({ id: view.id, view: updatedView, setViews, views });
    },
    updateModule: (id, module) =>
      updateModule({ id, module, setModules, modules }),
    deleteModule: (id) => deleteModule({ id, setModules, modules }),
    saveUserContextAs: (fileName) => saveUserContextAs({ fileName, user }),
    clearLocalStorage: () => {
      clearLocalStorage(LOCAL_STORAGE_ITEM_NAME);
      setState(DEFAULT_USER_CONTEXT, setters);
    },
    addView: (view, views) => addView({ view, views, setViews }),
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
