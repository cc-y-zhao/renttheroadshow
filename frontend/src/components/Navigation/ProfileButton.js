import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {useHistory} from 'react-router-dom';
import './ProfileButton.css'

function ProfileButton({ user, showModal, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <>
      <section className='profile-modal'>
        <div className='username-in-profile'>
          Username: {user.username}
        </div>
        <div className='email-in-profile'>
          Email Address: {user.email}
        </div>
        <button className='btn-in-profile logout-in-profile' onClick={logout}>Log Out</button>
        <button className='btn-in-profile' type="button" onClick={() => setShowModal(false)}>Cancel</button>
      </section>
    </>
  );
}

export default ProfileButton;
