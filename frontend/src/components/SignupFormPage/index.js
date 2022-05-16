import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import {getUsers} from '../../store/users';
import './SignupForm.css';

function SignupFormPage({showModal, setShowModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password })).then(() => dispatch(getUsers()))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className='signup-modal' onSubmit={handleSubmit}>
      <div className='signup-errors'>
        <div>
          {errors.map((error, idx) => <div key={idx}>{error}</div>)}
        </div>
      </div>
      <div>
        <div>Email: </div>
        <input
          className='input-signup'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <div>Username:</div>
        <input
          className='input-signup'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <div>Password: </div>
        <input
          className='input-signup'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <div>Confirm Password:</div>
        <input
          className='input-signup'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className='btn'>
        <button className='login-btn' type="submit">Sign Up</button>
        <button className='cancel-btn' type="button" onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </form>
  );
}

export default SignupFormPage;
