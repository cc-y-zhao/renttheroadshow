import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateListingForm from './CreateListingForm';
import './CreateListingForm.css';

function CreateRentalListingModal({user}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span className='nav-element create-form-btn' onClick={() => setShowModal(true)}>Create Rental Listing</span>
      {showModal && (
        <Modal className='create-listing-modal' onClose={() => setShowModal(false)}>
          <CreateListingForm user={user} showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateRentalListingModal;
