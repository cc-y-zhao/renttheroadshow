import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createListing } from '../../store/cars';
import {ValidationError} from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import allStates from "../../utils/USA_States";

import './CreateListingForm.css';

const CreateListingForm = ({ user, showModal, setShowModal }) => {
  // const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // const openForm = () => {
  //   if (showForm) return;
  //   setShowForm(true);
  // }
  ////////////
  // useEffect(() => {
  //   if (!showForm) return;

  //   const closeMenu = () => {
  //     setShowForm(false);
  //   };

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);

  // }, [showForm]);
  const [errors, setErrors] = useState([]);

  const ownerId = user.id;
  console.log("onwerId in createlistingform-----------", ownerId);
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState(0);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

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
      ownerId,
      description,
      brand,
      model,
      imageURL,
      price,
      city,
      state
    };

    console.log("payload----------", payload);

    let newListing;

    try {
      console.log("HI FROM TRY CATCH-----------------")

      newListing = await dispatch(createListing(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrors(error.errors);
      // setErrors(["Unable to process request"]);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrors({ overall: error.toString().slice(7) })
    }
    if (newListing) {
      setErrors([]);
      console.log('SUCCESS!!!!!!!!')
      setShowModal(false);
      history.push(`/listings/${user.id}`);
      // history.push(`/cars/${newListing.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrors([]);
    //close form:
    setShowModal(false);
    //TO DO: PASS IN THE SHOWMODAL AS A PARAM!!
  };

  return (
    <>
      <section>
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
          <div> Make:
            <input
              type="text"
              placeholder="Make"
              required
              value={brand}
              onChange={updateBrand} />
          </div>
          <div> Model:
            <input
              type="text"
              placeholder="Model"
              required
              value={model}
              onChange={updateModel} />
          </div>
          <div> Description:
            <input
              type="text"
              placeholder="Tell us a bit about your car"
              required
              value={description}
              onChange={updateDescription} />
          </div>
          <div> Price:
            <input
              type="number"
              placeholder="Price"
              min="15"
              required
              value={price}
              onChange={updatePrice} />
          </div>
          <div> Image URL:
            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={updateImageURL} />
          </div>
          <div>City:
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={updateCity} />
          </div>
          <div>State:
            <select onChange={updateState} value={state}>
              {allStates.map(state =>
                <option key={state}>{state}</option>
              )}
            </select>
          </div>
          <button
            type="submit"
            disabled={errors.length > 0}
          >
            Create new listing
          </button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      </section>
    </>
  );
};

export default CreateListingForm;
