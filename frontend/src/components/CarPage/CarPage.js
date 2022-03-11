// import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../LandingPage/LandingPage.css'
import { getOneCar } from "../../store/cars";
import './CarPage.css'
import CreateReviewModal from "../Reviews/CreateReviewModal";
import ReviewsPerCar from "../Reviews/ReviewsPerCar";

function CarPage() {
  const params = useParams();
  const carId = parseInt(params.carId, 10);

  console.log("carId from the CarPage-----------", carId);

  const dispatch = useDispatch();
  const history = useHistory();

  // TO DO: right now if you manually change the carId in the url nothing renders
  const car = useSelector(state => {
    return state.cars[carId];
  });

  useEffect(() => {
    dispatch(getOneCar(carId));
  }, [carId, dispatch]);

  //check if logged in user has already posted a review for this car, if so do not show create review modal:


  return (
    <div className='car-page-container'>
      <h2>{car.brand} {car.model}</h2>
      <div>
        <div className='img-of-car'>
          <img
            src={car.imageURL}
            alt={`${car.brand} ${car.model}`}
            height="370px"
            width="360px"
          />
        </div>
        <div className='description-of-car'>{car.description}</div>
        <div className='price-of-car'>Rental Price Per Day: $ {car.price}</div>
        <div className='location-of-car'>Location: {car.city}, {car.state}</div>
      </div>
      <div>
        <CreateReviewModal carId={car.id}/>
      </div>
      <div>
        <ReviewsPerCar carId={car.id}/>
      </div>
    </div>
  )
};

export default CarPage;
