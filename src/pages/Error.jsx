import Navigation from '@components/navigation/Navigation';
import React from 'react';
import { Navigate, useRouteError } from 'react-router-dom';
import './style/Error.css';

export default function Error() {
  const error = useRouteError();
  console.log(error);

  switch (error.status) {
    case 404:
      return (
        <>
          <Navigation />
          <div className="error">
            <h1>404</h1>
            <h2>{error.data}</h2>
          </div>
        </>
      );
    case 401:
      // Unauthorized
      return <Navigate to="/login" />;
    default:
      return (
        <>
          <Navigation />
          <div className="error">
            <h1>An error occurred.</h1>
            <h2>{error.message}</h2>
          </div>
        </>
      );
  }
}
