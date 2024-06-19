import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCarousel from '@components/landing/postCarousel/PostCarousel';

import './style/Landing.css';
import LabelButton from '@components/buttons/LabelButton';
import { InlineIcon } from '@iconify/react';
import fadeThenNavigate from '@utils/fadeThenNavigate';

export default function Landing() {
  const landingRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="landing-container" ref={landingRef}>
      <div className="title-wrapper">
        <img src="src/assets/logo.png" alt="Logo" className="logo" />
        <h1 className="title">Odinstagram</h1>
      </div>

      <PostCarousel />

      <div className="call-to-action">
        <LabelButton
          text="Sign up »"
          onClick={() => fadeThenNavigate(landingRef, '/signup', navigate)}
        />
        <LabelButton
          text="Log in »"
          onClick={() => fadeThenNavigate(landingRef, '/login', navigate)}
        />
        <div className="guest-account-tip">
          <div className="text">Guest account available</div>
          <InlineIcon
            className="icon"
            icon="ph:arrow-bend-right-up"
            height="unset"
          />
        </div>
      </div>
    </div>
  );
}
