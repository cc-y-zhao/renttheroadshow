import { csrfFetch } from "./csrf";
import { ValidationError } from '../utils/ValidationError';

const GET_REVIEWS_BY_CAR = 'reviews/GET_BY_CAR'
const ADD_ONE_REVIEW = 'reviews/ADD_ONE';

// const LOAD_LISTINGS_BY_OWNER = 'cars/LOAD_CARS_BY_OWNER';
// const EDIT_LISTING = 'listings/EDIT_LISTING';
// const DELETE_LISTING = 'listings/DELETE_LISTING';

const addOneReview = review => ({
  type: ADD_ONE_REVIEW,
  review
})

const loadReviewsByCar = reviews => ({
  type: GET_REVIEWS_BY_CAR,
  reviews,
});


// const editListing = listing => ({
//   type: EDIT_LISTING,
//   listing,
// })

// const deleteListing = (ownerId, carId) => ({
//   type: DELETE_LISTING,
//   ownerId,
//   carId,
// });

//////////////////////////////////////////////////////////////////////////////


export const getReviewsByCar = (carId) => async dispatch => {
  const response = await fetch(`/api/reviews/cars/${carId}`);

  console.log("HELLO FROM REVIEWS STORE-----------");


  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviewsByCar(reviews));
  }
}

//////////////////////////////////////////////////////////////////////////////

export const createReview = payload => async dispatch => {
  console.log("HI FROM THE REVIEWS STORE-----------");
  try {
    const response = await csrfFetch(`/api/reviews`, {
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

    const review = await response.json();
    dispatch(addOneReview(review));
    return review;

  } catch (error) {
    throw error;
  }

}


//////////////////////////////////////////////////////////////////////////////

// export const deleteOneListing = (ownerId, carId) => async dispatch => {

//   const response = await csrfFetch(`/api/listings/${ownerId}/${carId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   });

//   if (!response.ok) {
//     let error;
//     if (response.status === 422) {
//       error = await response.json();
//       throw new ValidationError(error.errors, response.statusText);
//     } else {
//       let errorJSON;
//       error = await response.text();
//       try {
//         // Check if the error is JSON, i.e., from the Car seeds. If so,
//         // don't throw error yet or it will be caught by the following catch
//         errorJSON = JSON.parse(error);
//       } catch {
//         // Case if server could not be reached
//         throw new Error(error);
//       }
//       throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
//     }
//   }

//   //if response is ok
//   const deletedListing = await response.json();
//   await dispatch(deleteListing(ownerId, carId));
//   return deletedListing;

// }

//////////////////////////////////////////////////////////////////////////////


// export const editOneListing = payload => async dispatch => {
//   const { ownerId, carId } = payload;
//   try {
//     const response = await csrfFetch(`/api/listings/${ownerId}/${carId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       let error;
//       if (response.status === 422) {
//         error = await response.json();
//         throw new ValidationError(error.errors, response.statusText);
//       } else {
//         let errorJSON;
//         error = await response.text();
//         try {
//           // Check if the error is JSON, i.e., from the Car seeds. If so,
//           // don't throw error yet or it will be caught by the following catch
//           errorJSON = JSON.parse(error);
//         } catch {
//           // Case if server could not be reached
//           throw new Error(error);
//         }
//         throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
//       }
//     }

//     const listing = await response.json();
//     dispatch(editListing(listing));
//     return listing;
//   } catch (error) {
//     throw error;
//   }
// }

//////////////////////////////////////////////////////////////////////////////


// export const getUserListings = (id) => async dispatch => {
//   const response = await fetch(`/api/listings/${id}`);

//   if (response.ok) {
//     const listings = await response.json();
//     dispatch(loadListingsByOwner(listings));
//   }
// }

//////////////////////////////////////////////////////////////////////////////

let newState;

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_CAR:
      const reviews = action.reviews;
      newState = {};
      reviews.forEach(review => {
        newState[review.id] = review;
      });
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;


// case LOAD_LISTINGS_BY_OWNER:
// const listings = action.listings;
// const newState = {};
// listings.forEach(listing => {
//   newState[listing.id] = listing;
// });
// return newState;
//     case EDIT_LISTING:
// return {
//   ...state,
//   [action.listing.id]: { ...action.listing },
// };
//     case DELETE_LISTING:
// const updatedState = { ...state };
// delete updatedState[action.carId]
// return updatedState;
