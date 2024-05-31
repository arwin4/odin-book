import Navigation from '@components/navigation/Navigation';
import React from 'react';
import { Link, Navigate, useNavigation, useRouteError } from 'react-router-dom';
import './style/Error.css';

export default function Error() {
  const error = useRouteError();
  console.log(error);
  // console.log(error);
  // console.log(error.status);
  // const navigation = useNavigation();

  switch (error.status) {
    // case 400:
    //   return <div className="error">{/* {error.data} {backToChatsBtn} */}</div>;

    case 404:
      return (
        <>
          <Navigation />
          <div className="error">
            <h1>404: Not Found</h1>
          </div>
        </>
      );
    case 401:
      // Unauthorized
      return <Navigate to="/login" />;
    default:
      return (
        <div className="error">
          An error occurred. {error.message}
          {/* {toLoginBtn} */}
        </div>
      );
  }
}
