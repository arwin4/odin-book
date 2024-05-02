import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing, { landingLoader } from '@pages/Landing';
import Login from '@pages/Login';
import Home from '@pages/Home';
import RequireAuthLayout from './layouts/RequireAuthLayout';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      // Layout function wraps any of its children inside <RequireAuth>
      element: <RequireAuthLayout />,
      children: [
        {
          index: true,
          element: <Home />,
          // loader: homeLoader
        },
      ],
    },
    {
      path: '/welcome',
      element: <Landing />,
      loader: landingLoader,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}
