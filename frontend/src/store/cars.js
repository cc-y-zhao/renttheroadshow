import { csrfFetch } from "./csrf";
import { ValidationError } from '../utils/ValidationError';

const LOAD_CARS = 'cars/LOAD';
const ADD_ONE_CAR = 'cars/ADD_ONE';
const LOAD_ONE_CAR = 'cars/LOAD_ONE';

const loadCars = list => ({
  type: LOAD_CARS,
  list,
});

const addOneCar = car => ({
  type: ADD_ONE_CAR,
  car,
});

const loadOneCar = car => ({
  type: LOAD_ONE_CAR,
  car
});

export const getOneCar = (carId) => async dispatch => {
  const response = await fetch(`/api/cars/${carId}`);

  if (response.ok) {
    const car = await response.json();
    console.log("car from fetch-----------------", car);
    dispatch(loadOneCar(car));
  }
};


export const getCars = () => async dispatch => {
  const response = await fetch(`/api/cars`);

  if (response.ok) {
    const list = await response.json();
    dispatch(loadCars(list));
  }
};

export const createListing = payload => async dispatch => {
  console.log("HI FROM THE CARS STORE-----------");
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


const carReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CARS:
      const allCars = {...state};
      action.list.forEach(car => {
        allCars[car.id] = car;
      });

      return allCars;
    case LOAD_ONE_CAR:
      const car = action.car;
      return {
        ...state,
        [action.car.id]: car
      };
    case ADD_ONE_CAR:
      const newCar = action.car;
      const newState = { ...state, newCar};
      return newState;
    default:
      return state;
  }
};

export default carReducer;
// const car = action.car;
// return {
//   ...state,
//   [action.car.id]: car
// };
