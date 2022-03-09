// import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../LandingPage/LandingPage.css'
import { getOneCar } from "../../store/cars";

function CarPage() {
  const params = useParams();
  const carId = parseInt(params.carId, 10);

  const dispatch = useDispatch();
  const history = useHistory();

  // TO DO: right now if you manually change the carId in the url nothing renders
  const car = useSelector(state => {
    console.log("state before carId in selector-------", state)
    console.log("carId in selector------------", carId);
    console.log("state---------------", state.cars[carId]);
    return state.cars[carId];
  });

  console.log("CAR IN CARPAGE----------", car);

  useEffect(() => {
    dispatch(getOneCar(carId));
  }, [carId]);


  return (
    <div>
      <h2>{car.brand} {car.model}</h2>
      <div>
        <div>
          <img
            src={car.imageURL}
            alt={`${car.brand} ${car.model}`}
            height="370px"
            width="360px"
          />
        </div>
        <div>{car.description}</div>
        <div>Price: {car.price}</div>
        <div>Location: {car.city}, {car.state}</div>
      </div>
    </div>
  )
};

export default CarPage;
