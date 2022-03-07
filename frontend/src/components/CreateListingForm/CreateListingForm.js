import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createListing } from '../../store/cars';
import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import allStates from "../../utils/USA_States";

const CreateListingForm = ({ hideForm }) => {
  const [errorMessages, setErrorMessages] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

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
    dispatch(getPokemonTypes());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //need to include the userId in payload:-----------------------
    const payload = {
      description,
      brand,
      model,
      imageURL,
      price,
      city,
      state
    };

    let createdListing;
    try {
      createdListing = await dispatch(createListing(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrorMessages(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) })
    }
    if (createdListing) {
      setErrorMessages({});
      history.push(`/cars/${createdListing.id}`);
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrorMessages({});
    hideForm();
  };

  return (
    <section>
      <ErrorMessage message={errorMessages.overall} />
      <form className="create-pokemon-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Make"
          required
          value={brand}
          onChange={updateBrand} />
        <ErrorMessage label={"Make"} message={errorMessages.brand} />
        <input
          type="text"
          placeholder="Model"
          required
          value={model}
          onChange={updateModel} />
        <ErrorMessage label={"Model"} message={errorMessages.model} />
        <input
          type="text"
          placeholder="Tell us a bit about your car"
          required
          value={description}
          onChange={updateDescription} />
        <ErrorMessage label={"Description"} message={errorMessages.description} />
        <input
          type="number"
          placeholder="Price"
          min="15"
          required
          value={price}
          onChange={updatePrice} />
        <ErrorMessage label={"Price"} message={errorMessages.price} />
        <input
          type="text"
          placeholder="Image URL"
          value={imageURL}
          onChange={updateImageURL} />
        <ErrorMessage label={"Image URL"} message={errorMessages.imageURL} />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={updateCity} />
        <ErrorMessage label={"City"} message={errorMessages.city} />
        <select onChange={updateState} value={state}>
          {allStates.map(state =>
            <option key={state}>{state}</option>
          )}
        </select>
        <ErrorMessage label={"State"} message={errorMessages.state} />
        <button type="submit">Create new listing</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default CreateListingForm;
