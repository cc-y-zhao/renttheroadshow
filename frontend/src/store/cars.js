import { csrfFetch } from "./csrf";
import { ValidationError } from '../utils/ValidationError';

const LOAD_CARS = 'cars/LOAD'
const ADD_ONE_CAR = 'cars/ADD_ONE'

const loadCars = list => ({
  type: LOAD_CARS,
  list,
})

const addOneCar = car => ({
  type: ADD_ONE_CAR,
  car,
})


export const getCars = () => async dispatch => {
  const response = await fetch(`/api/cars`);

  if (response.ok) {
    const list = await response.json();
    dispatch(loadCars(list));
  }
};

export const createListing = payload => async dispatch => {
  try {
    const response = await csrfFetch(`/api/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let error;
      if (response.status === 422) {
        error = await response.json();
        throw new ValidationError(error.errors, response.statusText);
      } else {
        let errorJSON;
        error = await response.text();
        try {
          // Check if the error is JSON, i.e., from the Car seeds. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        } catch {
          // Case if server could not be reached
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }

    const car = await response.json();
    dispatch(addOneCar(car));
    return car;
  } catch (error) {
    throw error;
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
    case ADD_ONE_CAR:
      const newCar = action.car;
      const newState = { ...state, newCar};
      return newState;
    default:
      return state;
  }
};

export default carReducer;
