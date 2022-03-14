import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { ValidationError } from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { deleteReview } from '../../store/reviews';
import './ReviewsPage.css';


const DeleteReview = ({reviewId}) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id

  const reviews = useSelector(state => {
    return Object.values(state.reviews);
  });

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(userId, reviewId));
    return setShowModal(false);
  }

  return (
    <>
      <button className='btn-in-review' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <section>
            <h3>Are you sure you want to delete this review?</h3>
            <div className='user-reviews-btns'>
              <button className='confirm-delete-review' onClick={handleDelete}>
                Yes, Delete Review
              </button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </section>
        </Modal>
      )}
    </>
  );
};

export default DeleteReview;
