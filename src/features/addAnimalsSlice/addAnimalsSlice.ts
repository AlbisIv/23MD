import { createSlice } from '@reduxjs/toolkit';

export type AnimalsType={
    id:number,
    name:string,
    imgsrc:string,
    species:string
}
export const addAnimals = createSlice({
  name: 'animals',
  initialState: {
    animals: JSON.parse(localStorage.getItem('animals') || '[]') as AnimalsType[],
    species: JSON.parse(localStorage.getItem('species') || '[]') as string[],
    isOpen: false,
  },
  reducers: {
    addAnimal: (state, action) => {
      state.animals = [...state.animals, action.payload];
      localStorage.setItem('animals', JSON.stringify(state.animals));
    },
    addSpecies: (state, action) => {
      const species = [...state.species, action.payload];
      localStorage.setItem('species', JSON.stringify(species));
      state.species = species;
    },
    filterBySpecies: (state, action) => {
      const allAnimals = JSON.parse(localStorage.getItem('animals') || '[]') as AnimalsType[];
      if (action.payload === 'all') {
        state.animals = allAnimals;
      } else {
        state.animals = allAnimals.filter((animal) => animal.species === action.payload);
      }
    },
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },

  },
});

// Action creators are generated for each case reducer function
export const {
  addAnimal, addSpecies, filterBySpecies, toggleIsOpen,
} = addAnimals.actions;

export default addAnimals.reducer;
