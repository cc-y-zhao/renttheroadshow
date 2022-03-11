import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";

import CarsList from "./components/CarsList";
import UserListings from "./components/UserListings/UserListings";
import CarPage from "./components/CarPage/CarPage";
import ReviewsPage from "./components/Reviews/ReviewsPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <CarsList />
          </Route>
          <Route path='/cars/:carId'>
            <CarPage />
          </Route>
          <Route path='/listings/:userId'>
            <UserListings/>
          </Route>
          <Route path='/reviews/users/:userId'>
            <ReviewsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
