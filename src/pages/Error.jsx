import NavBar from '@components/navbar/NavBar';
import React from 'react';
import { Navigate, useRouteError } from 'react-router-dom';
import './style/Error.css';

export default function Error() {
  const error = useRouteError();

  switch (error.status) {
    case 404:
      return (
        <>
          <NavBar />

          <main>
            <div className="error">
              <h1>404</h1>
              <h2>This page does not exist.</h2>
              <h3>
                If you were expecting a user or a post here, the user or post
                may no longer exist.
              </h3>
            </div>
          </main>
        </>
      );
    case 401:
      // Unauthorized
      return <Navigate to="/welcome" />;
    default:
      return (
        <main>
          <div className="error">
            <h1>An error occurred.</h1>
            <h2>{error.message}</h2>
          </div>
        </main>
      );
  }
}
