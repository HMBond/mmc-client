import { createContext, ReactNode } from 'react';
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { UserContextInterface } from '../../../types/interfaces';
import { UserContextOrNull } from '../../../types/types';

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
  LOCAL_STORAGE_DEBOUNCE_WAIT,
  USER_CONTEXT,
} from '../../definitions';
import { debounce } from 'lodash';

export const UserContext = createContext<UserContextOrNull>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const [editMode, setEditMode] = useState(USER_CONTEXT.editMode);
  const [showEditButton, setShowEditButton] = useState(
    USER_CONTEXT.showEditButton
  );
  const [invertTheme, setInvertTheme] = useState(USER_CONTEXT.invertTheme);
  const [leftHanded, setLeftHanded] = useState(USER_CONTEXT.leftHanded);
  const [activeView, setActiveView] = useState(USER_CONTEXT.activeView);
  const [views, setViews] = useState(USER_CONTEXT.views);
  const [modules, setModules] = useState(USER_CONTEXT.modules);
  const [inputName, setInputName] = useState(USER_CONTEXT.inputName);
  const [outputName, setOutputName] = useState(USER_CONTEXT.outputName);
  const [fileName, setFileName] = useState(USER_CONTEXT.fileName);

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

  function setState(
    user: { [key: string]: any },
    setters: { [key: string]: any }
  ) {
    for (const key in setters) {
      const name = key.slice(3);
      const camelCaseName = name.slice(0, 1).toLowerCase() + name.slice(1);
      const setter = setters[key];
      setter && setter(user[camelCaseName]);
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
      debounce((user) => {
        localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(user));
      }, LOCAL_STORAGE_DEBOUNCE_WAIT),
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
      updateView({ id: view.id, view: updatedView, views, setViews });
    },
    updateModule: (id, module) =>
      updateModule({ id, module, setModules, modules }),
    deleteModule: (id) => deleteModule({ id, setModules, modules }),
    saveUserContextAs: (fileName) => saveUserContextAs({ fileName, user }),
    clearLocalStorage: () => {
      clearLocalStorage(LOCAL_STORAGE_ITEM_NAME);
      setState(USER_CONTEXT, setters);
    },
    addView: (view) => addView({ view, views, setViews }),
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
