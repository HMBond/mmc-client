import React from 'react';
import { ModuleInterface } from './Module';
import { View } from './View';

export interface UserInterface {
  editMode: boolean;
  invertTheme: boolean;
  showEditButton: boolean;
  leftHanded: boolean;
  activeView: View;
  views: View[];
  modules: ModuleInterface[];
  inputName: string;
  outputName: string;
  fileName: string;
}

export interface UserContextInterface
  extends UserInterface,
    UserContextExtensions {
  setEditMode: (value: boolean) => void;
  setShowEditButton: (value: boolean) => void;
  setInvertTheme: (value: boolean) => void;
  setLeftHanded: (value: boolean) => void;
  setActiveView: (value: View) => void;
  setViews: (value: View[]) => void;
  setModules: (value: ModuleInterface[]) => void;
  setInputName: (value: string) => void;
  setOutputName: (value: string) => void;
  setFileName: (value: string) => void;
}

export interface UserContextExtensions {
  addModule: (view: View, module: ModuleInterface) => void;
  updateModule: (id: number, module: ModuleInterface) => void;
  deleteModule: (id: number) => void;
  saveUserContextAs: (fileName: string) => void;
  clearLocalStorage: () => void;
  addView: (view: View) => void;
}

export interface MidiContextInterface {
  input: any;
  setInput: (value: any) => void;
  inputs: any;
  setInputs: (value: any) => void;
  output: any;
  setOutput: (value: any) => void;
  outputs: any;
  setOutputs: (value: any) => void;
}
