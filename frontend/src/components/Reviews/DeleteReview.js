import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { ValidationError } from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { deleteOneListing } from '../../store/listings';

const DeleteReview = ({review}) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setShowModal(false);
    dispatch(getReviewsByUser(userId))
  }, [listings.toString()]);

  return (
    <>
      <button className='btn-in-listing' onClick={() => setShowModal(true)}>Delete Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <section>
            <h3>Are you sure you want to delete this Review?</h3>
            <button onClick={() => dispatch(deleteOneListing(ownerId, carId))}>
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
