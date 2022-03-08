import { csrfFetch } from "./csrf";
import { ValidationError } from '../utils/ValidationError';

const LOAD_LISTINGS_BY_OWNER = 'cars/LOAD_CARS_BY_OWNER';
const EDIT_LISTING = 'listings/EDIT_LISTING';

const loadListingsByOwner = listings => ({
  type: LOAD_LISTINGS_BY_OWNER,
  listings,
});

const editListing = listing => ({
  type: EDIT_LISTING,
  listing,
})

export const editOneListing = payload => async dispatch => {
  const {ownerId, carId} = payload;
  try {
    const response = await csrfFetch(`/api/listings/${ownerId}/${carId}`, {
      method: 'PUT',
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

    const listing = await response.json();
    dispatch(editListing(listing));
    return listing;
  } catch (error) {
    throw error;
  }
}


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
      const newState = {};
      listings.forEach(listing => {
        newState[listing.id] = listing;
      });
      return newState;
    case EDIT_LISTING:
      return {
        ...state,
        [action.listing.id]: {...action.listing},
      };
    default:
      return state;
  }
};

export default listingsReducer;
