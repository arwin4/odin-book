/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import useAuth from '@hooks/useAuth';

import LabelButton from '@components/buttons/LabelButton';
import fadeThenNavigate from '@utils/fadeThenNavigate';

export default function Login() {
  const { login, authed } = useAuth();
  const accessRef = useOutletContext();
  const navigate = useNavigate();

  const [loginErrors, setLoginErrors] = useState(null);
  const [loginBusy, setLoginBusy] = useState(false);

  if (authed) {
    return <Navigate to="/explore" />;
  }

  async function handleLogin(e) {
    setLoginBusy(true);
    const res = await login(e);
    if (!res.ok) {
      const resJson = await res.json();
      const { errors } = resJson;
      setLoginErrors(errors);
    }
    setLoginBusy(false);
  }

  function loginUsingDemoAccount(e) {
    setLoginBusy(true);
    e.target.classList.add('disabled');

    const form = e.currentTarget.parentNode;
    const submitEvent = new SubmitEvent('submit', { submitter: form });
    submitEvent.submitter.username.value = 'demo';
    submitEvent.submitter.password.value = 'demo';
  }

  const errorElement = loginErrors ? (
    <div className="errors">
      {loginErrors?.map((error) => (
        <p key={error.title}>{error.title}</p>
      ))}
    </div>
  ) : undefined;

  return (
    <>
      <h1>Log in</h1>

      {errorElement}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
          disabled={loginBusy}
          autoFocus
        />
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="on"
          placeholder="Password"
          required
          disabled={loginBusy}
        />
        <LabelButton text="Log in" type="submit" disabled={loginBusy} />
        <div className="or">
          <span className="dash" /> or <span className="dash" />
        </div>
        <LabelButton
          text="Use demo account"
          onClick={(e) => loginUsingDemoAccount(e)}
          type="submit"
        />
        <LabelButton
          text="Sign up"
          onClick={() => fadeThenNavigate(accessRef, '/signup', navigate)}
        />
      </form>
    </>
  );
}
