import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import '../LandingPage/LandingPage.css'


import { getCars } from "../../store/cars";

function CarsList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const cars = useSelector((state) => {
    return Object.values(state.cars);
  });

  console.log("cars--------", cars);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getCars()).then((data) => {
  //     if (!data) history.push("/404");
  //   });
  // }, [dispatch]);


  return (
    <div>
      <h2>Cars For Rent</h2>
      <div>
        <div>
          {cars?.map((car) => (
            <img
              src={car.imageURL}
              alt={`${car.brand} ${car.model}`}
              height="430px"
              width="300px"
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default CarsList;
