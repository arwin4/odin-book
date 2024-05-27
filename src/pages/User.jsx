import getJwt from '@utils/getJwt';
import React from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';

import userPropType from '@propTypes/user';
import getCurrentUser from '@utils/getCurrentUser';
import UserPosts from '@components/user/UserPosts';
import Avatar from '@components/user/Avatar';

import './style/UserCard.css';
import LabelButton from '@components/buttons/LabelButton';

export default function User() {
  const { user, posts } = useLoaderData();

  return (
    <>
      <UserCard user={user} />
      <UserPosts posts={posts} user={user} />
    </>
  );
}

function UserCard({ user }) {
  const isCurrentUser = user.id === getCurrentUser().id;

  return (
    <div className="user-card">
      <Avatar user={user} />
      <div className="info-wrapper">
        <NameWrapper user={user} />
        <FollowerCount user={user} />
        <Bio user={user} />
      </div>
      {!isCurrentUser && <FollowButton user={user} />}
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
        <LabelButton
          text="Unfollow"
          name="username"
          value={user.attributes.normalizedUsername}
          formMethod="DELETE"
          type="submit"
        />
      ) : (
        <LabelButton
          text="Follow"
          name="username"
          value={user.attributes.normalizedUsername}
          formMethod="POST"
          type="submit"
        />
      )}
    </fetcher.Form>
  );
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

  const [userRes, postsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/${username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    }),
    fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts?username=${username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    }),
  ]);

  const [fetchedUser, fetchedPosts] = await Promise.all([
    userRes.json(),
    postsRes.json(),
  ]);

  if (!userRes.ok) {
    throw new Response(fetchedUser.errors[0].title, { status: userRes.status });
  }

  if (!postsRes.ok) {
    throw new Response(fetchedPosts.errors[0].title, {
      status: postsRes.status,
    });
  }

  return { user: fetchedUser.data, posts: fetchedPosts.data };
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

  // Handle replace avatar
  if (request.method === 'PATCH') {
    // Refuse big files
    const file = data.get('file');
    if (file.size >= 10 ** 7) {
      throw new Error('Image must be smaller than 10 MB');
    }

    const formData = new FormData();
    formData.append('upload_preset', 'odinstragram-avatar');
    formData.append('file', file);

    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    let publicId;

    try {
      res = await fetch(
        'https://api.cloudinary.com/v1_1/dg2fuzzhq/image/upload/',
        requestOptions,
      );
      const parsedRes = await res.json();

      publicId = parsedRes.public_id;
    } catch (error) {
      // TODO: handle error
    }

    // TODO: try...catch
    res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: 'avatars',
          attributes: {
            publicId,
          },
        },
      }),
    });

    // console.log(await res.json());
    // return redirect('');
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

Avatar.propTypes = {
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
