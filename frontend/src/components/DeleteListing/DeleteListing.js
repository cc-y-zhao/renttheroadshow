import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { editOneListing } from '../../store/listings';
import { ValidationError } from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import allStates from "../../utils/USA_States";

const DeleteListing = ({ ownerId, carId }) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //need to include the userId in payload:-----------------------
    //refer back to Navigation Component (user={sessionUser})
    const payload = {
      ownerId,
      carId
    };

    let deletedListing;
    ////////////////////////////////////////////////////////////////////////////////
    try {
      deletedListing = await dispatch(editOneListing(payload));
    } catch (error) {
      console.log(error);
    }
    if (deletedListing) {
      console.log('DELETE SUCCESS!!!!!!!!');
      return;
      // return;
      // alert()
      // history.push(`/cars/${updatedListing.id}`);
    }
  };

  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   //close form:
  //   setShowForm(false);
  // };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <section>
            <h3>Are you sure you want to delete this listing?</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                value={ownerId}
              />
              <input
                type="hidden"
                value={carId}
              />
              <button
                type="submit"
              >
                Yes, Delete Listing
              </button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </section>
        </Modal>
      )}
    </>
  );
};

export default DeleteListing;
