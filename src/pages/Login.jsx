/* eslint-disable jsx-a11y/no-autofocus */
import React, { useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';

import './style/Login.css';
import LabelButton from '@components/buttons/LabelButton';

export default function Login() {
  const { login, authed } = useAuth();
  const { state } = useLocation();
  const loginRef = useRef();
  const navigate = useNavigate();

  const [loginErrors, setLoginErrors] = useState(null);
  // const [loginBusy, setLoginBusy] = useState(false);

  if (authed) {
    return <Navigate to={state?.path || '/'} />;
    // FIXME: Implement after login button on Landing sends state
  }

  async function handleLogin(e) {
    // setLoginBusy(true);
    const res = await login(e);
    if (!res.ok) {
      const resJson = await res.json();
      const { errors } = resJson;
      setLoginErrors(errors);
    }
    // setLoginBusy(false);
  }

  function loginUsingDemoAccount(e) {
    const form = e.currentTarget.parentNode;
    const submitEvent = new SubmitEvent('submit', { submitter: form });
    submitEvent.submitter.username.value = 'demo';
    submitEvent.submitter.password.value = 'demo';
  }

  const goToSignup = () => {
    loginRef.current.classList.add('fade-out');
    setTimeout(() => {
      navigate('/signup');
    }, 250);
  };

  return (
    <main>
      <div className="login" ref={loginRef}>
        <h1>Log in</h1>
        {loginErrors ? (
          <div className="errors">
            {loginErrors?.map((error) => (
              <p key={error.title}>{error.title}</p>
            ))}
          </div>
        ) : undefined}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            autoFocus
          />
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            placeholder="Password"
            required
          />
          <LabelButton text="Log in" type="submit" />
          <div className="or">
            <span className="dash" /> or <span className="dash" />
          </div>
          <LabelButton
            text="Use demo account"
            onClick={(e) => loginUsingDemoAccount(e)}
            type="submit"
          />
          <LabelButton text="Sign up" onClick={goToSignup} />
        </form>
      </div>
    </main>
  );
}
