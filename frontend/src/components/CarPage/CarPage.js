// import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../LandingPage/LandingPage.css'
import { getOneCar } from "../../store/cars";

function CarPage() {
  const params = useParams();
  const carId = parseInt(params.carId, 10);

  console.log("carId------------", carId);


  const car = useSelector(state => {
    console.log("state---------------", state.cars.carId);
    return Object.values(state.cars[carId]);
  });

  useEffect(() => {
    dispatch(getOneCar(carId));
  }, [dispatch]);
  // console.log("car----------------", car);

  const dispatch = useDispatch();
  const history = useHistory();



  return (
    <div>
      <h2>{car.brand} {car.model}</h2>
      <div>
        <div>
          <img
            src={car.imageURL}
            alt={`${car.brand} ${car.model}`}
            height="370px"
            width="360px"
          />
        </div>
        <div>{car.description}</div>
        <div>Price: {car.price}</div>
        <div>Location: {car.city}, {car.state}</div>
      </div>
    </div>
  )
};

export default CarPage;



// <div>
//   <h2>Cars For Rent</h2>
//   <div>
//     <div>
//       {cars?.map((car) => (
//         <>
//           <img
//             onClick={() => setShowModal(true)}
//             src={car.imageURL}
//             alt={`${car.brand} ${car.model}`}
//             height="370px"
//             width="360px"
//           />
//         </>
//       ))}
//     </div>
//     <div>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <section>
//             <CarPageModal car={car} />
//             <button type="button" onClick={() => setShowModal(false)}>Back to all cars</button>
//           </section>
//         </Modal>
//       )}
//     </div>
//   </div>
