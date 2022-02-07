import { INITIAL_STATE } from '../components/definitions';
import { reducer } from '../reducers/state.reducer';
import { View } from '../types/View.types';

const DUMMY_COUNT = 5;

const mockedViews: View[] = [];
for (let i = 0; i < DUMMY_COUNT; i++) {
  mockedViews.push(new View());
}

const mockedState = { ...INITIAL_STATE, views: mockedViews };

describe('moveView', () => {
  const { views } = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[0], toIndex: 1 });
  const moved = views.find((view) => view.id === mockedViews[0].id);
  test('should return a View[] that contains the moved view', () => {
    expect(moved).not.toBeUndefined();
  });
  test('should move the view to its new place', () => {
    if (!moved) throw new Error();
    expect(views.indexOf(moved)).toBe(1);
  });
  test('should move the next view down when incrementing 1 place up', () => {
    const affected = views.find((view) => view.id === mockedViews[1]?.id);
    if (!affected) throw new Error();
    expect(views.indexOf(affected)).toBe(0);
  });
  test('should move all affected views down when incrementing', () => {
    const { views } = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[0], toIndex: 3 });
    expect(views.indexOf(mockedViews[0])).toBe(3);
    expect(views.indexOf(mockedViews[1])).toBe(0);
    expect(views.indexOf(mockedViews[2])).toBe(1);
    expect(views.indexOf(mockedViews[3])).toBe(2);
  });
  test('should move all affected views up when decrementing', () => {
    const { views } = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[3], toIndex: 0 });
    expect(views.indexOf(mockedViews[0])).toBe(1);
    expect(views.indexOf(mockedViews[1])).toBe(2);
    expect(views.indexOf(mockedViews[2])).toBe(3);
    expect(views.indexOf(mockedViews[3])).toBe(0);
  });
  test('should not affect views that do not need to move', () => {
    const { views } = reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[4], toIndex: 3 });
    expect(views.indexOf(mockedViews[0])).toBe(0);
    expect(views.indexOf(mockedViews[1])).toBe(1);
    expect(views.indexOf(mockedViews[2])).toBe(2);
  });
  test('should not move view to non existing place', () => {
    expect(() =>
      reducer(mockedState, { type: 'MOVE_VIEW', view: mockedViews[2], toIndex: -1 })
    ).toThrow(Error);
    expect(() =>
      reducer(mockedState, {
        type: 'MOVE_VIEW',
        view: mockedViews[2],
        toIndex: DUMMY_COUNT + 1,
      })
    ).toThrow(Error);
  });
  test('should do nothing when index equals destination', () => {
    const { views } = reducer(mockedState, {
      type: 'MOVE_VIEW',
      view: mockedViews[2],
      toIndex: 2,
    });
    expect(views).toBe(mockedViews);
  });
});
