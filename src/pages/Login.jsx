/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';

export default function Login() {
  const { login, authed } = useAuth();
  const [loginErrors, setLoginErrors] = useState(null);
  // const [loginBusy, setLoginBusy] = useState(false);

  if (authed) {
    // return <Navigate to={state?.path || '/'} />;
    // FIXME: Implement after login button on Landing sends state

    return <Navigate to="/" />;
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