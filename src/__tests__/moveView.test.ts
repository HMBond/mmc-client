import { INITIAL_STATE } from '../components/definitions';
import { View } from '../types/View.types';
import { reducer } from '../reducers/state.reducer';

const DUMMY_COUNT = 5;

const mockedViews: View[] = [];
for (let i = 0; i < DUMMY_COUNT; i++) {
  mockedViews.push(new View({}, mockedViews.length));
}

describe('mockedViews', () => {
  test('should be sorted by place', () => {
    for (let i = 0; i < DUMMY_COUNT; i++) {
      expect(mockedViews[i].place).toBe(i + 1);
    }
  });
});

const mockedState = { ...INITIAL_STATE, views: mockedViews };

describe('moveView', () => {
  const newState = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[0], toPlace: 2 });
  const moved = newState.views.find((view) => view.id === mockedViews[0].id);
  test('should return a View[] that contains the moved view', () => {
    expect(moved).not.toBeUndefined();
  });
  test('should move the view to its new place', () => {
    expect(moved?.place).toBe(2);
  });
  test('should move the next view down when incrementing 1 place up', () => {
    const originalSecondPlace = mockedViews.find((view) => view.place === 2);
    const affected = newState.views.find((view) => view.id === originalSecondPlace?.id);
    expect(affected?.place).toBe(1);
  });
  test('should move all affected views down when incrementing', () => {
    const newState = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[0], toPlace: 4 });
    expect(newState.views.find((view) => view.id === mockedViews[0].id)?.place).toBe(4);
    expect(newState.views.find((view) => view.id === mockedViews[1].id)?.place).toBe(1);
    expect(newState.views.find((view) => view.id === mockedViews[2].id)?.place).toBe(2);
    expect(newState.views.find((view) => view.id === mockedViews[3].id)?.place).toBe(3);
  });
  test('should move all affected views up when decrementing', () => {
    const newState = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[3], toPlace: 1 });
    expect(newState.views.find((view) => view.id === mockedViews[0].id)?.place).toBe(2);
    expect(newState.views.find((view) => view.id === mockedViews[1].id)?.place).toBe(3);
    expect(newState.views.find((view) => view.id === mockedViews[2].id)?.place).toBe(4);
    expect(newState.views.find((view) => view.id === mockedViews[3].id)?.place).toBe(1);
  });
  test('should not affect views that do not need to move', () => {
    const newState = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[4], toPlace: 4 });
    expect(newState.views.find((view) => view.id === mockedViews[0].id)?.place).toBe(1);
    expect(newState.views.find((view) => view.id === mockedViews[1].id)?.place).toBe(2);
    expect(newState.views.find((view) => view.id === mockedViews[2].id)?.place).toBe(3);
  });
  test('should not move view to non existing place', () => {
    let newState = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[2], toPlace: 0 });
    expect(newState.views).toBe(mockedViews);
    newState = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[2], toPlace: -1 });
    expect(newState.views).toBe(mockedViews);
    newState = reducer(mockedState, {
      type: 'MOVE_VIEW',
      view: mockedViews[2],
      toPlace: DUMMY_COUNT + 1,
    });
    expect(newState.views).toBe(mockedViews);
  });
});
