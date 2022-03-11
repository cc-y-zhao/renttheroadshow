// import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../LandingPage/LandingPage.css'
import './CarPage.css'

function ReviewsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  console.log("params------------", params);

  const sessionUser = useSelector(state => state.session.user);
  const id = sessionUser.id;

  if (params.userId.toString() !== id.toString()) history.push('/');
  if (!sessionUser) history.push('/');

  // TO DO: right now if you manually change the carId in the url nothing renders
  const reviews = useSelector(state => {
    return state.reviews;
  });

  const cars = useSelector(state => {
    return state.cars;
  })

  useEffect(() => {
    dispatch(getOneCar(carId));
  }, [carId, dispatch]);

  //check if logged in user has already posted a review for this car, if so do not show create review modal:


  return (
    <div>
      <h2>My Reviews</h2>
      <div className='cars-container'>
        <div>
          {reviews?.map((review) => {
            return (
              <section className='each-review'>
                <div className='reviewer'>{cars[review.carId].brand}: </div>
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

export default UsersReviewPage;
