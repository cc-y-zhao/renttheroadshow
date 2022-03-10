import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import '../LandingPage/LandingPage.css';
import '../../index.css'
import './UserListings.css'


import { getUserListings } from "../../store/listings";
import EditListingModal from "../EditListing";
import DeleteListing from "../DeleteListing/DeleteListing";

function UserListings() {
  // const [showListings, setShowListings] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  console.log("params------------", params);

  const sessionUser = useSelector(state => state.session.user);
  const id = sessionUser.id;

  if (params.userId.toString() !== id.toString()) history.push('/');
  if (!sessionUser) history.push('/');

  // const openListings = () => {
  //   if (showListings) return;
  //   setShowListings(true);
  // }

  const listings = useSelector((state) => {
    return Object.values(state.listings);
  });

  useEffect(() => {
    dispatch(getUserListings(id));

  }, [listings.toString()]);

  console.log("listings----------", listings);


  // const handleCloseListings = (e) => {
  //   e.preventDefault();
  //   //close form:
  //   setShowListings(false);
  // };

  // {/* <button type="button" onClick={handleCloseListings}>Close</button> */}

  return (
    <div>
      <h2>My Listings</h2>
      <div>
        <div className='listings-container'>
          {listings?.map((car) => (
            <div className='car-in-listings'>
              <NavLink className='car-in-listings' key={car.id} to={'/cars/'+car.id}>
                <img
                  src={car.imageURL}
                  alt={`${car.brand} ${car.model}`}
                  height="370px"
                  width="360px"
                />
                <span className='car-name'>{car.brand} {car.model}</span>
              </NavLink>
              <EditListingModal car={car} ownerId={sessionUser.id} carId={car.id}
              />
              <DeleteListing ownerId={sessionUser.id} carId={car.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserListings;


// oldMake = { car.brand }
// oldModel = { car.model }
// oldDescription = { car.description }
// oldPrice = { car.price }
// oldImageURL = { car.imageURL }
// oldCity = { car.city }
// oldState = { car.state }
// ownerId = { sessionUser.id }
// carId = { car.id }
