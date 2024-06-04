import React from 'react';
import Posts from '@components/home/Posts';
import getJwt from '@utils/getJwt';
import { useLoaderData, useRevalidator } from 'react-router-dom';

export default function Explore() {
  const posts = useLoaderData();
  const revalidator = useRevalidator();

  function fetchMore() {
    // FIXME: use navigate instead. When using React Router, the history API
    // should not be directly manipulated.
    // navigate(...)
    // does work on first click, only on second click. Find out why

    const currentNumberOfPosts = posts.length;
    const limit = currentNumberOfPosts + 10;
    // eslint-disable-next-line no-restricted-globals
    window.history.replaceState({}, '', `${location.pathname}?limit=${limit}`);
    revalidator.revalidate();
  }

  return (
    <>
      <Posts posts={posts} />
      <button onClick={fetchMore} type="button">
        More
      </button>
    </>
  );
}

export async function exploreLoader() {
  const params = new URLSearchParams(document.location.search);
  const limit = params.get('limit');
  const filter = limit ? `?limit=${limit}` : '';

  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/posts${filter}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    },
  );

  if (!res.ok) {
    const { errors } = await res.json();
    throw new Response(errors[0].title, { status: res.status });
  }
  const parsedFetchedPosts = await res.json();
  return parsedFetchedPosts.data;
}
