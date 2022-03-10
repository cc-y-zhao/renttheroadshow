// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useHistory } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import '../LandingPage/LandingPage.css'

// import { getCars } from "../../store/cars";

// function CarPageModal({car}) {
//   // const dispatch = useDispatch();
//   // const history = useHistory();

//   console.log("CAR--------------", car);

//   // const cars = useSelector((state) => {
//   //   return Object.values(state.cars);
//   // });

//   // useEffect(() => {
//   //   dispatch(getCars());
//   // }, [dispatch]);

//   // useEffect(() => {
//   //   dispatch(getCars()).then((data) => {
//   //     if (!data) history.push("/404");
//   //   });
//   // }, [dispatch]);

//   return (
//     <div>
//       <h2>{car.brand} {car.model}</h2>
//       <div>
//         <img
//           src={car.imageURL}
//           alt={`${car.brand} ${car.model}`}
//           height="370px"
//           width="360px"
//         />
//       </div>

//     </div>
//   )
// }

// export default CarPageModal;
