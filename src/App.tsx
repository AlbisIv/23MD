// npm i axios
// npm install react-router-dom@6
// npm install @reduxjs/toolkit react-redux
// https://react-redux.js.org/tutorials/quick-start
// https://react-redux.js.org/using-react-redux/usage-with-typescript

// TODO Home lapā rādīt dzīvnieku kartiņas un pogu, kas atver overlay jauna dzīvnieka ievadei.
// TODO Kopējos dzīvnieka datus paņemt no local storage.

// TODO uzzīmēt dzīvnieku kartiņas ar iespējām filtrēt rezultātu
// TODO kopējais state priekš formas rādīšanas
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { AppDispatch, RootState } from './app/store';
import AddAnimalForm from './components/addAnimalForm/AddAnimalForm';
import { filterBySpecies, toggleIsOpen } from './features/addAnimalsSlice/addAnimalsSlice';

const App = () => {
  const animalArr = useSelector((state:RootState) => state.addAnimal.animals);
  const speciesArr = useSelector((state:RootState) => state.addAnimal.species);
  const isOpen = useSelector((state:RootState) => state.addAnimal.isOpen);
  // const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="App">
      <h1>Logo</h1>
      {speciesArr && (
        <div>
          <button
            onClick={() => {
              dispatch(filterBySpecies('all'));
            }}
          >
            Show all
          </button>
          {speciesArr.map((specie) => (
            <button
              key={Math.random()}
              onClick={() => {
                dispatch(filterBySpecies(specie));
              }}
            >
              {specie}
            </button>
          ))}
        </div>
      )}
      {animalArr.length === 0 && (<h2>No animals added</h2>)}
      {animalArr.length > 0 && (
      <div className="animal__container">
        {animalArr.map((animal) => (
          <div
            key={Math.random()}
            className="animal__card"
          >
            <img height="200px" src={animal.imgsrc} alt="" />
            <span>
              Name:
              {' '}
              {animal.name}
            </span>
            <span>
              Species:
              {' '}
              {animal.species}
            </span>
          </div>
        ))}
      </div>
      )}
      <button
        onClick={() => {
          dispatch(toggleIsOpen());
        }}
      >
        Add Animal
      </button>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Clear All Animals
      </button>
      {isOpen && <AddAnimalForm />}

    </div>
  );
};

export default App;
