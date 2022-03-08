import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import '../LandingPage/LandingPage.css'


import { getUserListings } from "../../store/listings";

function UserListings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  console.log("params------------", params);

  const sessionUser = useSelector(state => state.session.user);
  const id = sessionUser.id

  if (params.userId.toString() !== id.toString()) history.push('/');

  if (!sessionUser) history.push('/');

  useEffect(() => {
    dispatch(getUserListings(id));
  }, [dispatch]);

  const listings = useSelector((state) => {
    return Object.values(state.listings);
  });

  console.log("listings--------", listings);


  // useEffect(() => {
  //   dispatch(getCars()).then((data) => {
  //     if (!data) history.push("/404");
  //   });
  // }, [dispatch]);


  return (
    <div>
      <h2>My Listings</h2>
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
  )
}

export default UserListings;
