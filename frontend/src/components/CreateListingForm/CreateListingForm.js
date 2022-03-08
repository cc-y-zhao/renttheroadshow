import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createListing } from '../../store/cars';
import {ValidationError} from '../../utils/ValidationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import allStates from "../../utils/USA_States";

const CreateListingForm = ({ user }) => {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const openForm = () => {
    if (showForm) return;
    setShowForm(true);
  }
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

    let newListing;

    try {
      newListing = await dispatch(createListing(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrors(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      // else setErrorMessages({ overall: error.toString().slice(7) })
    }
    if (newListing) {
      setErrors([]);
      console.log('SUCCESS!!!!!!!!')
      // alert()
      history.push('/');
      // history.push(`/cars/${newListing.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrors([]);
    //close form:
    setShowForm(false);
  };

  return (
    <>
      <button onClick={openForm}>
        Create Rental Listing
      </button>
      {showForm && (
        <section>
          <form className="create-pokemon-form" onSubmit={handleSubmit}>
            <ul className="errors">
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
            Make:
            <input
              type="text"
              placeholder="Make"
              required
              value={brand}
              onChange={updateBrand} />
            Model:
            <input
              type="text"
              placeholder="Model"
              required
              value={model}
              onChange={updateModel} />
            Description:
            <input
              type="text"
              placeholder="Tell us a bit about your car"
              required
              value={description}
              onChange={updateDescription} />
            Price:
            <input
              type="number"
              placeholder="Price"
              min="15"
              required
              value={price}
              onChange={updatePrice} />
            Image URL:
            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={updateImageURL} />
            City:
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={updateCity} />
            State:
            <select onChange={updateState} value={state}>
              {allStates.map(state =>
                <option key={state}>{state}</option>
              )}
            </select>
            <button
              type="submit"
              disabled={errors.length > 0}
            >
              Create new listing
            </button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </form>
        </section>
      )}
    </>
  );
};

export default CreateListingForm;