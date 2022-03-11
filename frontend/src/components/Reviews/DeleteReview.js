import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { ValidationError } from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { deleteReview } from '../../store/reviews';

const DeleteReview = ({reviewId}) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id

  const reviews = useSelector(state => {
    return Object.values(state.reviews);
  });

  // useEffect(() => {
  //   setShowModal(false);
  // }, [reviews.toString()]);

  return (
    <>
      <button className='btn-in-listing' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <section>
            <h3>Are you sure you want to delete this Review?</h3>
            <button onClick={() => dispatch(deleteReview(userId, reviewId))}>
              Yes, Delete Review
            </button>
            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </section>
        </Modal>
      )}
    </>
  );
};

export default DeleteReview;
