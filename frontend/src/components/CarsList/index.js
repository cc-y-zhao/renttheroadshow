import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../LandingPage/LandingPage.css'


import { getCars } from "../../store/cars";

function CarsList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

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
            <>
              <img
                onClick={() => setShowModal(true)}
                src={car.imageURL}
                alt={`${car.brand} ${car.model}`}
                height="370px"
                width="360px"
              />
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <section>
                    <h3>TO DO: Insert Car Page Component Here</h3>
                    <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                  </section>
                </Modal>
              )}
            </>
          ))}
        </div>
      </div>

    </div>
  )
}

export default CarsList;
