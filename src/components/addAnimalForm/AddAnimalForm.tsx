import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { addAnimal, addSpecies, toggleIsOpen } from '../../features/addAnimalsSlice/addAnimalsSlice';
import styles from './AddAnimalForm.module.scss';

const AddAnimalForm = () => {
  const animalArr = useSelector((state:RootState) => state.addAnimal.animals);
  const speciesArr = useSelector((state:RootState) => state.addAnimal.species);
  const isOpen = useSelector((state:RootState) => state.addAnimal.isOpen);
  const dispatch = useDispatch<AppDispatch>();

  const [nameValue, setNameValue] = useState('');
  const [imgValue, setImgValue] = useState('');
  const [speciesValue, setSpeciesValue] = useState('');
  const [selectedSpecie, setSelectedSpecie] = useState<string>();

  const [isEditable, setIsEditable] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleAddAnimal = () => {
    if (!nameValue) {
      setErrorMsg('Name is required');
      return;
    }
    if (!imgValue) {
      setErrorMsg('Image is required');
      return;
    }
    if (!selectedSpecie) {
      setErrorMsg('Species is required');
      return;
    }
    dispatch(addAnimal({
      id: animalArr.length + 1,
      name: nameValue,
      imgsrc: imgValue,
      species: selectedSpecie,
    }));

    setNameValue('');
    setImgValue('');
    setSpeciesValue('');
    setErrorMsg('');
  };
  return (
    <dialog open={isOpen}>
      <h3>Add new animal</h3>
      <form className={styles.form} action="">
        <label htmlFor="name">
          Name
          <br />
          <input
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
            value={nameValue}
            id="name"
            type="text"
            placeholder="Name"
          />
        </label>
        <label htmlFor="img">
          Image source
          <br />
          <input
            onChange={(e) => {
              setImgValue(e.target.value);
            }}
            value={imgValue}
            id="img"
            type="text"
            placeholder="Image source"
          />
        </label>
        <label htmlFor="species">
          Species
          <br />
          {!isEditable && (
          <>
            <select
              value={selectedSpecie}
              onChange={(e) => {
                setSelectedSpecie(e.target.value);
              }}
              name="species"
              id="species"
            >
              <option hidden>Please select a specie</option>
              {speciesArr.map((specie) => (

                <option
                  key={Math.random()}
                >
                  {specie}
                </option>
              ))}

            </select>
          </>
          )}
          {isEditable
            && (
            <div>
              <input
                onChange={(e) => {
                  setSpeciesValue(e.target.value);
                }}
                value={speciesValue}
                id="species"
                type="text"
                placeholder="Species"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addSpecies(speciesValue));
                  setSpeciesValue('');
                }}
              >
                Add to Species
              </button>
            </div>
            )}
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEditable(!isEditable);
          }}
        >
          Add More Species
        </button>
        <br />
        {errorMsg && <span className={styles.error}>{errorMsg}</span>}
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddAnimal();
          }}
          type="button"
        >
          Add animal
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleIsOpen());
          }}
        >
          Close form
        </button>
      </form>
    </dialog>
  );
};

export default AddAnimalForm;
