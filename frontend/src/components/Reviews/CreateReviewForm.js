import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import { ValidationError } from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { createReview, getReviewsByCar } from '../../store/reviews';
// import { getUserListings } from '../../store/listings';
// import { getOneCar } from '../../store/cars';

import './CreateReviewForm.css';

const CreateReviewForm = ({ carId, showModal, setShowModal }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const userId = useSelector(state => state.session.user).id

  const updateRating = (e) => setRating(e.target.value);
  const updateContent = (e) => setContent(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (rating.length === 0) validationErrors.push('Please submit a rating between 1 and 5');
    if (content.length < 10) validationErrors.push('Please tell us a bit more about your experience');

    setErrors(validationErrors);
  }, [rating, content])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      carId,
      rating,
      content
    };

    let newReview;

    try {

      newReview = await dispatch(createReview(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrors(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrors({ overall: error.toString().slice(7) })
    }
    if (newReview) {
      setErrors([]);
      dispatch(getReviewsByCar(carId));
      setShowModal(false);
      return history.push(`/cars/${carId}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrors([]);
    setShowModal(false);
  };

  return (
    <>
      <section className='section-create-review-form'>
        <form className='create-review-form' onSubmit={handleSubmit}>
          <div className='errors-div-create-review'>
            <ul>
              {errors &&
                errors.map(error => (
                  <li key={error}>{error}</li>
                ))
              }
            </ul>
          </div>
          <input
            type="hidden"
            value={userId}
          />
          <input
            type="hidden"
            value={carId}
          />
          <div className='review-content-input'>
            <span>Review: </span>
            <textarea
              className='review-textbox'
              type="text"
              placeholder="Tell us about your experience renting this car"
              required
              value={content}
              onChange={updateContent} />
          </div>
          <div>
            <span>Rating: </span>
            <select className='select-rating' onChange={updateRating} value={rating}>
              {["", 1, 2, 3, 4, 5].map(num =>
                <option key={num}>{num}</option>
              )}
            </select>
          </div>
          <div className='btns-review-form'>
            <button className='btn-in-form create-review'
              type="submit"
              disabled={errors.length > 0}
            >
              Post Review
            </button>
            <button className='btn-in-form' type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateReviewForm;
