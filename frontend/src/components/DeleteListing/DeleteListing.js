import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { deleteOneListing } from '../../store/listings';
import { ValidationError } from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import allStates from "../../utils/USA_States";

const DeleteListing = ({ ownerId, carId }) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <section>
            <h3>Are you sure you want to delete this listing?</h3>
            <h3>Here are ownerId and carId {ownerId} {carId}</h3>
              <button onClick={() => dispatch(deleteOneListing(ownerId, carId))}>
                Yes, Delete Listing
              </button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </section>
        </Modal>
      )}
    </>
  );
};

export default DeleteListing;
