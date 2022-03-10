import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../LandingPage/LandingPage.css'

import CarPageModal from '../CarPageModal/CarPageModal';
import { NavLink } from 'react-router-dom';
import '../../index.css';
import './CarsList.css';


function ReviewsPerCar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const reviews = useSelector((state) => {
    console.log("state.reviews----------------", state.reviews)
    return Object.values(state.reviews);
  });

  const loadReviews = reviews.length > 0;


  // useEffect(() => {
  //   dispatch(getCars());
  // }, [dispatch]);


  // return (
  //   <div>
  //     <h2>Reviews</h2>
  //     <div className='cars-container'>
  //       {loadReviews && (
  //         reviews.map((review) => {
  //           return (
  //             <>
  //               <div>{review.userId} said: <div>
  //               <div>{review.content}</div>
  //               <div>Rating: {review.rating}</div>
  //             </>
  //           )
  //         })
  //       )}
  //     </div>
  //   </div>
  // )

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
