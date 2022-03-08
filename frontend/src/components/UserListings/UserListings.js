import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import '../LandingPage/LandingPage.css';

import { getUserListings } from "../../store/listings";
import EditListingForm from "../EditListing/EditListing";
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
        <div>
          {listings?.map((car) => (
            <span className='car-in-listings'>
              <img
                src={car.imageURL}
                alt={`${car.brand} ${car.model}`}
                height="370px"
                width="360px"
              />
              <span>{car.brand} {car.model}</span>
              <EditListingForm ownerId={sessionUser.id} carId={car.id}/>
              <DeleteListing ownerId={sessionUser.id} carId={car.id} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserListings;
