import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButtonModal from './ProfileButtonModal';
import CreateRentalListingModal from '../CreateListingForm/index';
import UserListings from '../UserListings/UserListings';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import '../../index.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  console.log("sessionUSer----------", sessionUser);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButtonModal user={sessionUser} />
        <CreateRentalListingModal user={sessionUser}/>
        <NavLink className='navlink nav-element nav-listings' to={'/listings/'+sessionUser.id}>My Listings</NavLink>
        <NavLink className='navlink nav-element nav-reviews' to='/'>My Reviews</NavLink>
        <span className='welcome-msg nav-element'>Welcome, {sessionUser.username}!</span>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className='navlink nav-element signup-nav' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav>
      <ul className='links-in-nav'>
        <li className='no-bullet'>
          <NavLink className='navlink nav-element nav-home' exact to="/">
            <img
              className='logo-in-nav'
              src='./images/logo.png'
              alt='RTRS logo'
              height='40px'
            />
          </NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;


// return (
//   <nav className='nav-container'>
//     <ul className='links-in-nav'>
//       <li className='no-bullet'>
//         <NavLink className='navlink nav-element nav-home' exact to="/">Home</NavLink>
//         {isLoaded && sessionLinks}
//       </li>
//     </ul>
//   </nav>
// );


// <ProfileButton user={sessionUser} />
