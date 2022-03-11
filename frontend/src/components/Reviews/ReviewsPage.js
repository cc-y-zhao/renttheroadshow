// import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { getReviewsByUser } from "../../store/reviews";
import DeleteReview from "./DeleteReview";
import EditReviewModal from "./EditReviewModal";
import './ReviewsPage.css';

// import '../LandingPage/LandingPage.css'
// import './CarPage.css'

function ReviewsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  console.log("params------------", params);

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id

  // if (params.userId.toString() !== userId.toString()) history.push('/');
  // if (!sessionUser) history.push('/');

  const reviews = useSelector(state => {
    console.log("STATE FROM REVIEWSPAGE------------", state);
    return Object.values(state.reviews);
  });

  console.log("REVIEWS FROM REVIEWSPAGE------------", reviews);

  const cars = useSelector(state => {
    return state.cars;
  })

  // console.log("CARS FROM REVIEWSPAGE---------", cars)

  useEffect(() => {
    dispatch(getReviewsByUser(userId));
  }, [reviews.toString()]);

  console.log('reviews in reviewspage', reviews);

  //check if logged in user has already posted a review for this car, if so do not show create review modal:

  return (
    <div>
      <h2>My Reviews</h2>
      <div className='reviews-container'>
        <div>
          {reviews?.map((review) => {
            return (
              <>
                <section className='each-review'>
                  <NavLink key={review.carId} to={'/cars/' + review.carId}>
                    <img
                      className='review-car-img'
                      src={cars[review.carId].imageURL}
                      alt={`${cars[review.carId].brand} ${cars[review.carId].model}`}
                      height="370px"
                      width="360px"
                    />
                    <div className='review-car-type'>{cars[review.carId].brand} {cars[review.carId].model}</div>
                  </NavLink>
                  <div className='review-content'>"{review.content}"</div>
                  <div className='review-rating'>Rating: {review.rating} / 5</div>
                </section>
                <EditReviewModal review={review} />
                <DeleteReview reviewId={review.id}/>
              </>
            );
          }
          )}
        </div>
      </div>

    </div>
  )

};

export default ReviewsPage;
