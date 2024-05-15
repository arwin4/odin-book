import getJwt from '@utils/getJwt';
import React from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import './style/UserCard.css';

import userPropType from '@propTypes/user';
import getCurrentUser from '@utils/getCurrentUser';
import UserPosts from '@components/user/UserPosts';

export default function User() {
  const { user, posts } = useLoaderData();

  return (
    <>
      <h1>Home</h1>
      <UserCard user={user} />
      <UserPosts posts={posts} user={user} />
    </>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <ProfilePicture />
      <NameWrapper user={user} />
      <FollowerCount user={user} />
      <Bio user={user} />
      <FollowButton user={user} />
    </div>
  );
}

function FollowButton({ user }) {
  const fetcher = useFetcher();

  const currentUser = getCurrentUser();
  const { followers } = user.attributes;
  const isFollowing = !!followers.includes(currentUser.id);

  return (
    <fetcher.Form className="follow-user">
      {isFollowing ? (
        <button
          type="submit"
          name="username"
          value={user.attributes.normalizedUsername}
          formMethod="DELETE"
        >
          Unfollow
        </button>
      ) : (
        <button
          type="submit"
          name="username"
          value={user.attributes.normalizedUsername}
          formMethod="POST"
        >
          Follow
        </button>
      )}
    </fetcher.Form>
  );
}

function ProfilePicture() {
  // TODO: add profile picture
}

function NameWrapper({ user }) {
  return (
    <div className="name-wrapper">
      <div className="first-name">{user.attributes.firstName}</div>
      <div className="username">@{user.attributes.username}</div>
    </div>
  );
}

function FollowerCount({ user }) {
  const numberOfFollowers = user.attributes.followers.length;
  return (
    <div className="follower-count">
      {numberOfFollowers}
      {numberOfFollowers === 1 ? ' follower' : ' followers'}
    </div>
  );
}

function Bio({ user }) {
  return <div className="bio">{user.attributes.bio}</div>;
}

export async function userLoader({ params }) {
  const { username } = params;

  const res = await Promise.all([
    fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/${username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    }),
    fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts?username=${username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    }),
  ]);

  if (!res.ok) {
    // const { errors } = await res.json();
    // throw new Response(errors[0].title, { status: res.status });
  }

  const parsedFetchedUser = await res[0].json();
  const parsedFetchedPosts = await res[1].json();

  return { user: parsedFetchedUser.data, posts: parsedFetchedPosts.data };
}

export async function userAction({ request }) {
  const data = await request.formData();
  const userToFollow = data.get('username');

  let res;

  // Handle follow user
  if (request.method === 'POST') {
    res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/users/${userToFollow}/followers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  // Handle unfollow user
  if (request.method === 'DELETE') {
    res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/users/${userToFollow}/followers`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  if (!res.ok) {
    const { errors } = await res.json();
    return errors;
  }

  // Prevent fetcher.data (error) from persisting
  return null;
}

/* Prop Types */
UserCard.propTypes = {
  user: userPropType.isRequired,
};

NameWrapper.propTypes = {
  user: userPropType.isRequired,
};

FollowerCount.propTypes = {
  user: userPropType.isRequired,
};

Bio.propTypes = {
  user: userPropType.isRequired,
};

FollowButton.propTypes = {
  user: userPropType.isRequired,
};
