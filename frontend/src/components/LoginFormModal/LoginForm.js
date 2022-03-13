import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import './LoginForm.css';

function LoginForm({showModal, setShowModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    const credential = 'jeff_winger';
    const password = 'password';

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form className='login-modal' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className='label'>
        Username or Email:
        <input
          className='username-in-login'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='label'>
        Password:
        <input
          className='password-in-login'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div className='btn'>
        <button className='login-btn' type="submit">Log In</button>
        <button className='cancel-btn' type="button" onClick={() => setShowModal(false)}>Cancel</button>
      </div>
      <div className='demo-login-div'>
        <button className='demo-login-btn' type="button" onClick={handleDemoLogin}>Demo Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
