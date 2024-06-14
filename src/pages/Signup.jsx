/* eslint-disable jsx-a11y/no-autofocus */
import LabelButton from '@components/buttons/LabelButton';
import React, { useRef } from 'react';

import fadeThenNavigate from '@utils/fadeThenNavigate';
import { Form, useActionData, useNavigate } from 'react-router-dom';

import './style/Login.css';

export default function Signup() {
  const navigate = useNavigate();
  const signupRef = useRef();
  const signupErrors = useActionData();

  return (
    <main>
      <div className="signup" ref={signupRef}>
        <h1>Sign up</h1>
        {signupErrors ? (
          <div className="errors">
            {signupErrors?.map((error) => (
              <p key={error.title}>{error.title}</p>
            ))}
          </div>
        ) : undefined}
        <Form method="POST">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            maxLength={30}
            required
            autoComplete="username"
            autoFocus
          />
          <input
            type="text"
            id="first-name"
            name="first-name"
            placeholder="First name"
            maxLength={30}
            autoComplete="given-name"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            placeholder="Password (min. 3 characters)"
            minLength={3}
            maxLength={64}
            required
          />
          <LabelButton text="Sign up" type="submit" />
          <div className="or">
            <span className="dash" /> or <span className="dash" />
          </div>
          <LabelButton
            text="Go to login"
            onClick={() => fadeThenNavigate(signupRef, '/login', navigate)}
          />
        </Form>
      </div>
    </main>
  );
}
