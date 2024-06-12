import React from 'react';
import useAuth from '@hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PostCarousel from '@components/landing/postCarousel/PostCarousel';

import './style/Landing.css';
import LabelButton from '@components/buttons/LabelButton';

export default function Landing() {
  const { authed } = useAuth();
  const { state } = useLocation();

  if (authed) {
    return <Navigate to={state?.path || '/'} />;
  }

  return (
    <div className="landing-container">
      <h1 className="title">Odinstagram</h1>

      <PostCarousel />

      <div className="call-to-action">
        <LabelButton text="Enter »" />
      </div>
    </div>
  );
}
