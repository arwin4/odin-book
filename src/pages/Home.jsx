import React from 'react';
import Posts from '@components/home/Posts';
import getJwt from '@utils/getJwt';
import { Link, useLoaderData } from 'react-router-dom';

import './style/Home.css';

export default function Home() {
  const posts = useLoaderData();

  if (posts.length === 0) {
    return (
      <div className="home">
        <div className="no-posts-tip">
          <h2>No posts yet!</h2>
          <h3>
            Head over to{' '}
            <Link className="explore-link" to="/explore">
              <em>Explore</em>
            </Link>{' '}
            to find some users to follow.
          </h3>
        </div>
      </div>
    );
  }

  return <Posts posts={posts} />;
}

export async function homeLoader() {
  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/posts?filter[followed]=true`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    },
  );

  if (!res.ok) {
    // const { errors } = await res.json();
    // throw new Response(errors[0].title, { status: res.status });
  }
  const parsedFetchedPosts = await res.json();
  return parsedFetchedPosts.data;
}
