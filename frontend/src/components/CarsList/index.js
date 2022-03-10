import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../LandingPage/LandingPage.css'
import { getCars } from "../../store/cars";
import CarPageModal from '../CarPageModal/CarPageModal';
import { NavLink } from 'react-router-dom';
import '../../index.css';
import './CarsList.css';


function CarsList() {
  const dispatch = useDispatch();
  const history = useHistory();

  // const [showModal, setShowModal] = useState(false);
  // const [currentCar, setCurrentCar] = useState({});

  const [imageClicked, setImageClicked] = useState(false);

  const cars = useSelector((state) => {
    console.log("state.cars----------------", state.cars)
    return Object.values(state.cars);
  });


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
      <div className='cars-container'>
        <div>
          {cars.map((car) => {
            return (
              <NavLink className='each-car-in-cars' key={car.id} to={'/cars/' + car.id}>
                <img
                  src={car.imageURL}
                  alt={`${car.brand} ${car.model}`}
                  height="370px"
                  width="360px"
                />
              </NavLink>
            );
          }
          )}
        </div>
      </div>

    </div>
  )
}

export default CarsList;



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
