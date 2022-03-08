import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import '../LandingPage/LandingPage.css'


import { getUserListings } from "../../store/listings";

function UserListings({user}) {
  const [showListings, setShowListings] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  console.log("params------------", params);

  const sessionUser = useSelector(state => state.session.user);
  const id = user.id

  if (params.userId.toString() !== id.toString()) history.push('/');
  if (!sessionUser) history.push('/');

  const openListings = () => {
    if (showListings) return;
    setShowListings(true);
  }

  useEffect(() => {
    dispatch(getUserListings(id));
  }, [dispatch]);

  const listings = useSelector((state) => {
    return Object.values(state.listings);
  });

  console.log("listings--------", listings);


  const handleCloseListings = (e) => {
    e.preventDefault();
    //close form:
    setShowListings(false);
  };


  return (
    <>
      <button onClick={openListings}>
        View My Listings
      </button>
      {showListings && (
        <div>
          <h2>My Listings</h2>
          <button type="button" onClick={handleCloseListings}>Close</button>
          <div>
            <div>
              {listings?.map((car) => (
                <img
                  src={car.imageURL}
                  alt={`${car.brand} ${car.model}`}
                  height="370px"
                  width="360px"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserListings;
