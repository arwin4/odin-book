import React from 'react';
import useAuth from '@hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PostCarousel from '@components/landing/postCarousel/PostCarousel';
import CallToAction from '@components/landing/CallToAction';

export default function Landing() {
  const { authed } = useAuth();
  const { state } = useLocation();

  if (authed) {
    return <Navigate to={state?.path || '/'} />;
  }

  return (
    <>
      <h1>odinstagram</h1>
      <h2>slogan</h2>
      {/* TODO: Logo */}
      <PostCarousel />
      <CallToAction />
    </>
  );
}
