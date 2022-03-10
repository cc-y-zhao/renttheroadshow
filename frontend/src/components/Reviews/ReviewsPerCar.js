import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../LandingPage/LandingPage.css'

// import CarPageModal from '../CarPageModal/CarPageModal';
import { NavLink } from 'react-router-dom';
import '../../index.css';
// import './CarsList.css';

import { getReviewsByCar } from '../../store/reviews';


function ReviewsPerCar(carId) {
  const dispatch = useDispatch();
  const history = useHistory();

  const reviews = useSelector((state) => {
    console.log("state.reviews----------------", state)
    return Object.values(state.reviews);
  });

  console.log("carId from reviewsperCar!!!!!!!!!-------------", carId.carId)
  console.log("reviews from ReviewsPerCar-----------", reviews);

  const id = carId.carId;


  useEffect(() => {
    dispatch(getReviewsByCar(id));
  }, [dispatch]);

  return (
    <div>
      <h2>Reviews</h2>
      <div className='cars-container'>
        <div>
          {reviews?.map((review) => {
            return (
              <>
                <div>{review.userId} said: </div>
                <div>{review.content}</div>
                <div>Rating: {review.rating}</div>
              </>
            );
          }
          )}
        </div>
      </div>

    </div>
  )

}

export default ReviewsPerCar;
