import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing, { landingLoader } from './pages/Landing';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
      loader: landingLoader,
    },
  ]);

  return <RouterProvider router={router} />;
}
