// import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../LandingPage/LandingPage.css'
import { getOneCar } from "../../store/cars";
import { getReviewsByCar } from "../../store/reviews";
import './CarPage.css'
import CreateReviewModal from "../Reviews/CreateReviewModal";
import ReviewsPerCar from "../Reviews/ReviewsPerCar";

function CarPage() {
  const params = useParams();
  const carId = parseInt(params.carId, 10);

  const dispatch = useDispatch();
  const history = useHistory();

  // TO DO: right now if you manually change the carId in the url nothing renders
  const car = useSelector(state => {
    return state.cars[carId];
  });

  const user = useSelector(state => state.session.user);
  let userId;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    dispatch(getOneCar(carId)).then(() => dispatch(getReviewsByCar(carId)));
  }, [dispatch]);

  if (!car) {
    history.push('/404');
  }
  //check if logged in user has already posted a review for this car, if so don't show the Post Review button
  const reviews = useSelector((state) => {
    return Object.values(state.reviews);
  });

  const userIds = [];

  reviews.forEach(review => {
    userIds.push(review.userId);
  });


  //check:
  // 1) if logged in user is the owner of this car
  // 2) if logged in user has already posted a review for this car
  // 3) if session user is logged in
  // if not, don't show the Post Review button
  let enablePostReviewButton = false;
  if (car.ownerId !== userId && !userIds.includes(userId) && user) {
    enablePostReviewButton = true;
  }

  return (
    <div className='car-page-container'>
      <h2>{car?.brand} {car?.model}</h2>
      <div>
        <div className='img-of-car'>
          <img
            src={car?.imageURL}
            alt={`${car?.brand} ${car?.model}`}
            height="370px"
            width="360px"
          />
        </div>
        <div className='description-of-car'>{car?.description}</div>
        <div className='price-of-car'>Rental Price Per Day: $ {car?.price}</div>
        <div className='location-of-car'>Location: {car?.city}, {car?.state}</div>
      </div>
      <div>
        {enablePostReviewButton &&
          <CreateReviewModal carId={car?.id} />
        }
      </div>
      <div>
        <ReviewsPerCar carId={carId}/>
      </div>
    </div>
  )
};

export default CarPage;
