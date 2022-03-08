import { csrfFetch } from "./csrf";
import { ValidationError } from '../utils/ValidationError';

const LOAD_LISTINGS_BY_OWNER = 'cars/LOAD_CARS_BY_OWNER';

const loadListingsByOwner = listings => ({
  type: LOAD_LISTINGS_BY_OWNER,
  listings,
});

export const getUserListings = (id) => async dispatch => {
  const response = await fetch(`/api/listings/${id}`);

  if (response.ok) {
    const listings = await response.json();
    dispatch(loadListingsByOwner(listings));
  }
}

// const initialState = {
//   list: [],
//   types: [],
// };


const listingsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_LISTINGS_BY_OWNER:
      const listings = action.listings;
      const newState = {...listings};
      return newState;
    default:
      return state;
  }
};

export default listingsReducer;
