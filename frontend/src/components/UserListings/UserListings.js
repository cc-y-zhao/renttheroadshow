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

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const id = sessionUser.id;

  if (params.userId.toString() !== id.toString()) history.push('/');
  if (!sessionUser) history.push('/');

  const listings = useSelector((state) => {
    return Object.values(state.listings);
  });

  useEffect(() => {
    dispatch(getUserListings(id));
  }, [listings.toString()]);


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
