import { csrfFetch } from "./csrf";
import { ValidationError } from '../utils/ValidationError';

const GET_REVIEWS_BY_CAR = 'reviews/GET_BY_CAR'
const ADD_ONE_REVIEW = 'reviews/ADD_ONE';
const GET_REVIEWS_BY_USER = 'reviews/GET_BY_USER';
const DELETE_ONE_REVIEW = 'reviews/DELETE-ONE';
const EDIT_ONE_REVIEW = 'reviews/EDIT';

const addOneReview = review => ({
  type: ADD_ONE_REVIEW,
  review,
})

const loadReviewsByCar = reviews => ({
  type: GET_REVIEWS_BY_CAR,
  reviews,
});

const loadReviewsByUser = reviews => ({
  type: GET_REVIEWS_BY_USER,
  reviews,
});

const deleteOneReview = reviewId => ({
  type: DELETE_ONE_REVIEW,
  reviewId,
})

const editOneReview = review => ({
  type: EDIT_ONE_REVIEW,
  review,
})

//////////////////////////////////////////////////////////////////////////////


export const getReviewsByCar = (carId) => async dispatch => {
  const response = await fetch(`/api/reviews/cars/${carId}`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviewsByCar(reviews));
  }

  // reviews.forEach(async review => {
  //   const userId = review.userId;
  //   const response = await fetch(`/api/users/${userId}`);

  //   let username = '';

  //   if (response.ok) {
  //     const user = await response.json();
  //     username = user.username;
  //   } else {
  //     username = 'Reviewer';
  //   }

  //   review['username'] = username;
  // });
}

//////////////////////////////////////////////////////////////////////////////

export const createReview = payload => async dispatch => {

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

/////////////////////////////////////////////////////////////////////////////


export const getReviewsByUser = (userId) => async dispatch => {
  const response = await fetch(`/api/reviews/users/${userId}`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviewsByUser(reviews));
  }
}

//////////////////////////////////////////////////////////////////////////////


export const deleteReview = (userId, reviewId) => async dispatch => {

  const response = await csrfFetch(`/api/reviews/${userId}/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
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

  //if response is ok
  const deletedReview = await response.json();
  await dispatch(deleteOneReview(reviewId));
  return deletedReview;

}

//////////////////////////////////////////////////////////////////////////////

export const editReview = payload => async dispatch => {
  const { reviewId, userId, carId, rating, content } = payload;
  try {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
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

    const updatedReview = await response.json();
    console.log("updatedReview from reviews store--------", updatedReview);
    dispatch(editOneReview(updatedReview));
    return updatedReview;
  } catch (error) {
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////

let newState;

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_CAR:
      newState = {};
      action.reviews.forEach(review => {
        newState[review.id] = review;
      });
      return newState;
    case ADD_ONE_REVIEW:
      const newReview = action.review;
      newState = {...state, newReview};
      return newState;
    case GET_REVIEWS_BY_USER:
      newState = {};
      action.reviews.forEach(review => {
        newState[review.id] = review;
      })
      return newState;
    case EDIT_ONE_REVIEW:
      const updatedReview = action.review;
      newState = {
        ...state,
        [updatedReview.id]: {...updatedReview}
      };
      return newState;
    case DELETE_ONE_REVIEW:
      newState = {...state};
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
