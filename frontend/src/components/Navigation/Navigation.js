import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateListingForm from '../CreateListingForm/CreateListingForm';
import UserListings from '../UserListings/UserListings';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  console.log("sessionUSer----------", sessionUser);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <CreateListingForm user={sessionUser}/>
        <ul className='nav-space'></ul>
        <NavLink className='navlink' to={'/listings/'+sessionUser.id}>My Listings</NavLink>
        <NavLink className='navlink' to='/'>My Reviews</NavLink>
        <span className='welcome-msg'>Welcome, {sessionUser.username}!</span>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className='nav-container'>
      <ul>
        <li>
          <NavLink className='navlink' exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
