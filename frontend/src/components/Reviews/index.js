import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import { ValidationError } from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { createListing } from '../../store/cars';
import { getUserListings } from '../../store/listings';
import { getOneCar } from '../../store/cars';

import './CreateReviewForm.css';

const CreateReviewForm = ({ carId, userId, showModal, setShowModal }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);


  const updateRating = (e) => setRating(e.target.value);
  const updateContent = (e) => setContent(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (rating.length < 1 || rating.length > 5) validationErrors.push('Please submit a rating between 1 and 5');
    if (content.length < 10) validationErrors.push('Please tell us a bit more about your experience');

    setErrors(validationErrors);
  }, [rating, content])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ownerId,
      rating,
      brand,
      model,
      imageURL,
      content,
      city,
      state
    };

    let newListing;

    try {
      console.log("HI FROM TRY CATCH-----------------")

      newListing = await dispatch(createListing(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrors(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrors({ overall: error.toString().slice(7) })
    }
    if (newListing) {
      setErrors([]);
      console.log('SUCCESS!!!!!!!!')
      setShowModal(false);
      dispatch(getUserListings(user.id));
      dispatch(getOneCar(newListing.id));
      return history.push(`/listings/${user.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrors([]);
    setShowModal(false);
  };

  return (
    <>
      <section className='section-create-listing-form'>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors &&
              errors.map(error => (
                <li key={error}>{error}</li>
              ))
            }
          </ul>
          <input
            type="hidden"
            value={user.id}
          />
          <div>
            <span>Make: </span>
            <input
              type="text"
              placeholder="Make"
              required
              value={brand}
              onChange={updateBrand} />
          </div>
          <div>
            <span>Model: </span>
            <input
              type="text"
              placeholder="Model"
              required
              value={model}
              onChange={updateModel} />
          </div>
          <div>
            <span>Description: </span>
            <input
              className='rating'
              type="text"
              placeholder="Tell us a bit about your car"
              required
              value={rating}
              onChange={updateRating} />
          <updateContent/div>
          <div>
            <span>Price per day: </span>
            <input
              type="number"
              placeholder="Price"
              min="15"
              required
              value={content}
              onChange={updatePrice} />
          </div>
          <div>
            <span>Image URL: </span>
            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={updateImageURL} />
          </div>
          <div>
            <span>City: </span>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={updateCity} />
          </div>
          <div>
            <span>State: </span>
            <select onChange={updateState} value={state}>
              {allStates.map(state =>
                <option key={state}>{state}</option>
              )}
            </select>
          </div>
          <button className='btn-in-form create-listing'
            type="submit"
            disabled={errors.length > 0}
          >
            Create new listing
          </button>
          <button className='btn-in-form' type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      </section>
    </>
  );
};

export default CreateReviewForm;
