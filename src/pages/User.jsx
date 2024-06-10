import React, { useRef } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';

import useAuth from '@hooks/useAuth';

import userPropType from '@propTypes/user';
import getCurrentUser from '@utils/getCurrentUser';
import UserPosts from '@components/user/UserPosts';
import Avatar from '@components/user/Avatar';

import './style/UserCard.css';
import LabelButton from '@components/buttons/LabelButton';
import Dialog from '@components/dialog/Dialog';

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
    <div className="user-card-container">
      <div className="user-card">
        <Avatar user={user} />
        <div className="info-wrapper">
          <NameWrapper user={user} />
          <FollowerCount user={user} />
          <Bio user={user} />
          {!isCurrentUser && <FollowButton user={user} />}

          {isCurrentUser && <Logout />}
        </div>
      </div>
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

function Logout() {
  const { logout } = useAuth();
  const confirmLogoutModal = useRef();

  return (
    <>
      <LabelButton
        text="Sign out"
        onClick={() => confirmLogoutModal.current.showModal()}
      />
      <Dialog title="Sign out?" icon="ph:sign-out" ref={confirmLogoutModal}>
        <div className="confirmation">
          <div>
            <LabelButton text="Confirm" onClick={logout} />
          </div>
          <form className="cancel-btn" method="dialog">
            <LabelButton text="Cancel" type="submit" />
          </form>
        </div>
      </Dialog>
    </>
  );
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
