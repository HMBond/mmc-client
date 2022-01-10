import { DEFAULT_FILE_NAME, INITIAL_STATE } from '../components/definitions';
import { reducer } from '../reducers/state.reducer';

describe('save state as', () => {
  global.URL.createObjectURL = jest.fn();
  test('should save default name when no fileName is given', () => {
    const newState = reducer(INITIAL_STATE, { type: 'SAVE_STATE_AS', fileName: '' });
    expect(newState.fileName).toBe(DEFAULT_FILE_NAME);
  });
  test('should always use an extension, even when not given', () => {
    const fileName = 'some-file-name-with-no-extension';
    const newState = reducer(INITIAL_STATE, { type: 'SAVE_STATE_AS', fileName });
    expect(newState.fileName).toBe(fileName + '.json');
  });
});
