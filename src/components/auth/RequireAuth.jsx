import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '@hooks/useAuth';

export default function RequireAuth({ children }) {
  const { authed, setAuthed } = useAuth();

  // Check if already logged in
  useEffect(() => {
    if (authed) return;

    // Use the user item to check for login
    const user = localStorage.getItem('user');

    if (user) {
      // If there is no 'type' property, the user is not authorized and the
      // object will contain an error message instead.
      const parsedUser = JSON.parse(user);
      if (parsedUser.type) {
        setAuthed(true);
      }
    }
  }, []);

  return authed === true ? children : <Navigate to="/welcome" />;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
