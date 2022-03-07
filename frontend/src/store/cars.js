// import { csrfFetch } from "./csrf";
// import { ValidationError } from '../utils/validationError';

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

export const createListing = data => async dispatch => {
  try {
    const response = await fetch(`/api/cars`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
          // Check if the error is JSON, i.e., from the Pokemon server. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        } catch {
          // Case if server could not be reached
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }

    const pokemon = await response.json();
    dispatch(addOne(pokemon));
    return pokemon;
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
    default:
      return state;
  }
};

export default carReducer;
