import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { editOneListing } from '../../store/listings';
import { ValidationError } from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import allStates from "../../utils/USA_States";
import './EditListing.css';

const EditListingForm = ({ car, ownerId, carId, showModal, setShowModal}) => {
  // const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // const openForm = () => {
  //   if (showForm) return;
  //   setShowForm(true);
  // }

  const [errors, setErrors] = useState([]);

  const [description, setDescription] = useState(car.description);
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [imageURL, setImageURL] = useState(car.imageURL);
  const [price, setPrice] = useState(car.price);
  const [city, setCity] = useState(car.city);
  const [state, setState] = useState(car.state);

  const updateDescription = (e) => setDescription(e.target.value);
  const updateBrand = (e) => setBrand(e.target.value);
  const updateModel = (e) => setModel(e.target.value);
  const updateImageURL = (e) => setImageURL(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (brand.length < 3) validationErrors.push("Model name must be 3 or more characters");
    if (model.length === 0) validationErrors.push('Please provide the model of your car');
    if (description.length === 0) validationErrors.push('Please tell us a bit about your car');
    if (imageURL.length === 0) validationErrors.push('Please provide an image URL for your car');
    if (!price || price < 15) validationErrors.push('Please provide a minimum $15 rental price for your car');
    if (city.length === 0) validationErrors.push('Please provide the city where your car is located');
    if (state.length < 2) validationErrors.push('Please provide the state where your car is located');

    setErrors(validationErrors);
  }, [brand, model, description, imageURL, price, city, state])

  const handleSubmit = async (e) => {
    e.preventDefault();

    //need to include the userId in payload:-----------------------
    //refer back to Navigation Component (user={sessionUser})
    const payload = {
      carId,
      ownerId,
      description,
      brand,
      model,
      imageURL,
      price,
      city,
      state
    };

    let updatedListing;
////////////////////////////////////////////////////////////////////////////////
    try {
      updatedListing = await dispatch(editOneListing(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrors(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      // else setErrorMessages({ overall: error.toString().slice(7) })
    }
    if (updatedListing) {
      setErrors([]);
      setShowModal(false);
      return;
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrors([]);
    //close form:
    setShowModal(false);
  };

  return (
    <>
      <section className='section-edit-listing-form'>
        <form onSubmit={handleSubmit}>
          <div className='errors-in-create-listing'>
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
            value={ownerId}
          />
          <input
            type="hidden"
            value={carId}
          />
          <div>
            <span>Make: </span>
            <input
              className='input-in-edit-listing'
              type="text"
              placeholder="Make"
              required
              value={brand}
              onChange={updateBrand} />
          </div>
          <div>
            <span>Model: </span>
            <input
              className='input-in-edit-listing'
              type="text"
              placeholder="Model"
              required
              value={model}
              onChange={updateModel} />
          </div>
          <div>
            <span>Description: </span>
            <textarea
              className='description'
              type="text"
              placeholder="Tell us a bit about your car"
              required
              value={description}
              onChange={updateDescription} />
          </div>
          <div>
            <span>Price per day: </span>
            <input
              className='input-in-edit-listing'
              type="number"
              placeholder="Price"
              min="15"
              required
              value={price}
              onChange={updatePrice} />
          </div>
          <div>
            <span>Image URL: </span>
            <input
              className='input-in-edit-listing'
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={updateImageURL} />
          </div>
          <div>
            <span>City:</span>
            <input
              className='input-in-edit-listing'
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
          <div className='btns-edit-listing'>
            <button
              className='btn-in-form update-listing-btn'
              type="submit"
              disabled={errors.length > 0}
            >
              Update Listing
            </button>
            <button className='btn-in-form' type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditListingForm;
