import { AnimalsType } from './features/addAnimalsSlice/addAnimalsSlice';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('animals');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state:AnimalsType[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('animals', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
