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
      console.log('SUCCESS!!!!!!!!');
      console.log("updated listing------------", updatedListing);
      setShowModal(false);
      return;
      // history.push(`/cars/${carId}`)
      // return;
      // alert()
      // history.push(`/cars/${updatedListing.id}`);
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
          <ul>
            {errors &&
              errors.map(error => (
                <li key={error}>{error}</li>
              ))
            }
          </ul>
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
              type="text"
              placeholder={car.brand}
              required
              value={brand}
              onChange={updateBrand} />
          </div>
          <div>
            <span>Model: </span>
            <input
              type="text"
              placeholder={car.model}
              required
              value={model}
              onChange={updateModel} />
          </div>
          <div>
            <span>Description: </span>
            <input
            className='description'
              type="text"
              placeholder={car.description}
              required
              value={description}
              onChange={updateDescription} />
          </div>
          <div>
            <span>Price: </span>
            <input
              type="number"
              placeholder={car.price}
              min="15"
              required
              value={price}
              onChange={updatePrice} />
          </div>
          <div>
            <span>Image URL: </span>
            <input
              type="text"
              placeholder={car.imageURL}
              value={imageURL}
              onChange={updateImageURL} />
          </div>
          <div>
            <span>City:</span>
            <input
              type="text"
              placeholder={car.city}
              value={city}
              onChange={updateCity} />
          </div>
          <div>
            <span>State: </span>
            <select onChange={updateState} value={state} placeholder={car.state}>
              {allStates.map(state =>
                <option key={state}>{state}</option>
              )}
            </select>
          </div>
          <button
            className='btn-in-form'
            type="submit"
            disabled={errors.length > 0}
          >
            Update Listing
          </button>
          <button className='btn-in-form' type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      </section>
    </>
  );
};

export default EditListingForm;
