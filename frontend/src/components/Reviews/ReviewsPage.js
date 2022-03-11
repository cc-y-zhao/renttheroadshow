// import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { getReviewsByUser } from "../../store/reviews";

// import '../LandingPage/LandingPage.css'
// import './CarPage.css'

function ReviewsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  console.log("params------------", params);

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id

  if (params.userId.toString() !== userId.toString()) history.push('/');
  if (!sessionUser) history.push('/');

  const reviews = useSelector(state => {
    console.log("STATE FROM REVIEWSPAGE------------", state);
    return state.reviews;
  });

  console.log("REVIEWS FROM REVIEWSPAGE------------", reviews);

  const cars = useSelector(state => {
    return state.cars;
  })

  console.log("CARS[2] FROM REVIEWSPAGE---------", cars[2])

  useEffect(() => {
    dispatch(getReviewsByUser(userId));
  }, [dispatch]);

  //check if logged in user has already posted a review for this car, if so do not show create review modal:

  return (
    <div>
      <h2>My Reviews</h2>
      <div className='cars-container'>
        <div>
          {reviews?.map((review) => {
            return (
              <section className='each-review'>
                <img
                  src={cars[review.carId].imageURL}
                  alt={`${cars[review.carId].brand} ${cars[review.carId].model}`}
                  height="370px"
                  width="360px"
                />
                <div className='review-content'>"{review.content}"</div>
                <div>Rating: {review.rating}</div>
              </section>
            );
          }
          )}
        </div>
      </div>

    </div>
  )

};

export default ReviewsPage;
