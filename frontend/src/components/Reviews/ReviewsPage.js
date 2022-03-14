// import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { getReviewsByUser } from "../../store/reviews";
import { getCars } from "../../store/cars";

import DeleteReview from "./DeleteReview";
import EditReviewModal from "./EditReviewModal";
import './ReviewsPage.css';


function ReviewsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id

  if (params.userId.toString() !== userId.toString()) history.push('/');
  if (!sessionUser) history.push('/');

  const reviews = useSelector(state => {
    return Object.values(state.reviews);
  });

  const cars = useSelector(state => {
    return state.cars;
  })

  useEffect(() => {
    dispatch(getReviewsByUser(userId));
  }, [reviews.toString(), cars.toString()]);

  console.log("reviews in ReviewsPage----------", reviews)

  return (
    <div>
      <h2>My Reviews</h2>
      <div className='reviews-container'>
        <div className='review-and-buttons'>
          {reviews?.map((review) => {
            return (
              <>
                <section className='each-review'>
                  <NavLink className='img-and-name' key={review.carId} to={'/cars/' + review.carId}>
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
                <div className='btn-div'>
                  <EditReviewModal review={review} />
                  <DeleteReview reviewId={review.id}/>
                </div>
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
