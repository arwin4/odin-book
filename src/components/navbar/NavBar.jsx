import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import getCurrentUser from '@utils/getCurrentUser';

import './style/NavBar.css';

export default function NavBar() {
  const currentUser = getCurrentUser();
  const navBarRef = useRef();

  useEffect(() => {
    let lastScrollPosition = window.scrollY;
    window.addEventListener('scroll', () => {
      // NOTE: Also fires when window is resized
      if (window.scrollY > lastScrollPosition) {
        navBarRef.current?.classList.remove('show-on-scroll-up');
      } else if (window.scrollY < lastScrollPosition) {
        navBarRef.current?.classList.add('show-on-scroll-up');
      }
      lastScrollPosition = window.scrollY;
    });
  }, [window.scrollY]);

  return (
    <nav className="nav-bar" ref={navBarRef}>
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
