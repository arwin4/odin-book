import getJwt from '@utils/getJwt';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './style/UserCard.css';

import userPropType from '@propTypes/user';

export default function User() {
  const user = useLoaderData();

  return (
    <>
      <h1>Home</h1>
      <UserCard user={user} />
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
      {/* <FollowButton /> */}
    </div>
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
  return (
    <div className="follower-count">
      {user.attributes.followers.length} followers
    </div>
  );
}

function Bio({ user }) {
  return <div className="bio">{user.attributes.bio}</div>;
}

export async function userLoader({ params }) {
  const { username } = params;

  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/users/${username}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    },
  );

  if (!res.ok) {
    // const { errors } = await res.json();
    // throw new Response(errors[0].title, { status: res.status });
  }
  const parsedFetchedUser = await res.json();
  return parsedFetchedUser.data;
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
