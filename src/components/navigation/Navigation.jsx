import React from 'react';
import { NavLink } from 'react-router-dom';

import getCurrentUser from '@utils/getCurrentUser';

import './style/Navigation.css';

export default function Navigation() {
  const currentUser = getCurrentUser();

  return (
    <nav className="nav-bar">
      <NavLink className="item" to="/">
        <div className="description">My feed</div>
      </NavLink>
      <NavLink className="item" to="/explore">
        <div className="description">Explore</div>
      </NavLink>
      <NavLink className="item" to={`/user/${currentUser.attributes.username}`}>
        <div className="description">Profile</div>
      </NavLink>
      <NavLink className="item" to="/new-post">
        <div className="description">New post</div>
      </NavLink>
    </nav>
  );
}
