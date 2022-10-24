import { expect } from '@jest/globals';
import { INITIAL_STATE } from '../DEFINITION';
import { reducer } from '../reducers/state.reducer';
import { Module } from '../types/Module.types';

describe('adding a module', () => {
  test('should add a module to the active view', () => {
    const module = new Module();
    const newState = reducer(INITIAL_STATE, {
      type: 'ADD_MODULE',
      module,
    });
    expect(newState.modules).toContain(module);
    const activeView = newState.views.find((view) => view.id === newState.activeViewId);
    expect(activeView && activeView.moduleIds).toContain(module.id);
  });
});
