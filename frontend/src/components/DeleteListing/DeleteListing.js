import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { ValidationError } from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import allStates from "../../utils/USA_States";

import { deleteOneListing } from '../../store/listings';

import './DeleteListing.css';

const DeleteListing = ({ ownerId, carId }) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const listings = useSelector((state) => {
    return Object.values(state.listings);
  });

  useEffect(() => {
    setShowModal(false);
  }, [listings.toString()]);

  return (
    <>
      <button className='btn-in-listing' onClick={() => setShowModal(true)}>Delete Listing</button>
      <div className='delete-listing-modal'>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <section>
              <h3>Are you sure you want to delete this listing?</h3>
              <div className='delete-listing-btns'>
                <button className='delete-listing-btn' onClick={() => dispatch(deleteOneListing(ownerId, carId))}>
                  Yes, Delete Listing
                </button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </section>
          </Modal>
        )}
      </div>
    </>
  );
};

export default DeleteListing;
