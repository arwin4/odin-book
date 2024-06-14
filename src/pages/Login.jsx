/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@hooks/useAuth';

import './style/Login.css';

export default function Login() {
  const { login, authed } = useAuth();
  const { state } = useLocation();

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

  return (
    <div className="login">
      <h2>Log in</h2>

      {loginErrors ? (
        <div className="errors">
          {loginErrors?.map((error) => (
            <p key={error.title}>{error.title}</p>
          ))}
        </div>
      ) : undefined}

      <form onSubmit={handleLogin}>
        <label htmlFor="username">
          Username
          <input type="text" id="username" name="username" required autoFocus />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            required
          />
        </label>

        {/* <LabelButton
          icon="ri:arrow-right-double-fill"
          inline="true"
          text="Log in"
          type="submit"
          busy={loginBusy}
        /> */}
        <button type="submit">Log in</button>
        <button onClick={loginUsingDemoAccount} type="submit">
          Demo
        </button>
      </form>

      {/* <div className="signup-container">
        <Link to="/signup">
          <LinkButton
            icon="ri:arrow-right-double-fill"
            text="Sign up in 10 seconds"
            inline="true"
          />
        </Link>
      </div> */}
    </div>
  );
}
