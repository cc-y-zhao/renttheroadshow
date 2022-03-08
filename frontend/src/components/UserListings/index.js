import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import '../LandingPage/LandingPage.css'


import { getUserListings } from "../../store/cars";

function UserListings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userParams = useParams();

  console.log("useParams------------", useParams);

  const sessionUser = useSelector(state => state.session.user);
  const id = sessionUser.id
  console.log("sessionUser---------", sessionUser.id);

  if (!sessionUser) history.push('/');

  const cars = useSelector((state) => {
    return Object.values(state.cars);
  });

  console.log("cars--------", cars);

  useEffect(() => {
    dispatch(getUserListings(id));
  }, [dispatch]);

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
          {cars?.map((car) => (
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
