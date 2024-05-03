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

export async function landingLoader() {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts`, {
    method: 'GET',
  });

  if (!res.ok) {
    // const { errors } = await res.json();
    // throw new Response(errors[0].title, { status: res.status });
  }
  const parsedFetchedPosts = await res.json();
  return parsedFetchedPosts.data;
}
