// import { csrfFetch } from "./csrf";
// import { ValidationError } from '../utils/validationError';

const LOAD_CARS = 'car/LOAD'

export const loadCars = list => ({
  type: LOAD_CARS,
  list,
})


export const getCars = () => async dispatch => {
  const response = await fetch(`/api/cars`);

  if (response.ok) {
    const list = await response.json();
    dispatch(loadCars(list));
  }
};



// const initialState = {
//   list: [],
//   types: [],
// };

//utility function. This could go in another file
//returns an ordered array of pokemon numbers
// const sortList = list => {
//   return list
//     .sort((pokemonA, pokemonB) => {
//       return pokemonA.number - pokemonB.number;
//     })
//     .map(pokemon => pokemon.id);
// };

const carReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CARS:
      const allCars = {};
      action.list.forEach(car => {
        allCars[car.id] = car;
      });

      return allCars;
    default:
      return state;
  }
};

export default carReducer;
