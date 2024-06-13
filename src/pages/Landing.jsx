import React, { useRef } from 'react';
import useAuth from '@hooks/useAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import PostCarousel from '@components/landing/postCarousel/PostCarousel';

import './style/Landing.css';
import LabelButton from '@components/buttons/LabelButton';
import { InlineIcon } from '@iconify/react';

export default function Landing() {
  // const { authed } = useAuth();
  // const { state } = useLocation();

  // if (authed) {
  //   return <Navigate to={state?.path || '/'} />;
  // }

  const landingRef = useRef();
  const navigate = useNavigate();

  const enter = () => {
    landingRef.current.classList.add('fade-out');
    setTimeout(() => {
      navigate('/login');
    }, 250);
  };

  return (
    <div className="landing-container" ref={landingRef}>
      <h1 className="title">Odinstagram</h1>

      <PostCarousel />

      <div className="call-to-action">
        <LabelButton text="Sign up »" onClick={enter} />
        <LabelButton text="Log in »" onClick={enter} />
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
