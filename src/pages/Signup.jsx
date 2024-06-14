/* eslint-disable jsx-a11y/no-autofocus */
import LabelButton from '@components/buttons/LabelButton';
import React, { useRef } from 'react';

import fadeThenNavigate from '@utils/fadeThenNavigate';
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

import './style/Login.css';

export default function Signup() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const errors = useActionData();
  const signupRef = useRef();

  const errorElement = errors ? (
    <div className="errors">
      {errors?.map((error) => (
        <p key={error.title}>{error.title}</p>
      ))}
    </div>
  ) : undefined;

  return (
    <main>
      <div className="signup" ref={signupRef}>
        <h1>Sign up</h1>

        {errorElement}

        <Form method="POST">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            maxLength={30}
            required
            autoComplete="username"
            disabled={navigation.state !== 'idle'}
            autoFocus
          />
          <input
            type="text"
            id="first-name"
            name="first-name"
            placeholder="First name"
            maxLength={30}
            autoComplete="given-name"
            disabled={navigation.state !== 'idle'}
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
            disabled={navigation.state !== 'idle'}
            required
          />
          <LabelButton
            text="Sign up"
            type="submit"
            disabled={navigation.state !== 'idle'}
          />
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
