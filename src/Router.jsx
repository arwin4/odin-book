import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Landing from '@pages/Landing';
import Login from '@pages/Login';
import Home from '@pages/Home';
import User from '@pages/User';
import NewPostForm from '@pages/NewPost';
import Post from '@pages/Post';
import Error from '@pages/Error';

// Loaders
import homeLoader from '@pages/loaders/homeLoader';
import exploreLoader from '@pages/loaders/exploreLoader';
import userLoader from '@pages/loaders/userLoader';
import userAction from '@pages/actions/userAction';
import postLoader from '@pages/loaders/postLoader';
import postAction from '@pages/actions/postAction';

// Actions
import newPostAction from '@pages/actions/newPostAction';
import landingLoader from '@pages/loaders/landingLoader';
import Explore from '@pages/Explore';
import RequireAuthLayout from './layouts/RequireAuthLayout';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      // Layout function wraps any of its children inside <RequireAuth>
      element: <RequireAuthLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Explore />,
          loader: homeLoader,
        },
        {
          path: 'explore',
          element: <Explore />,
          loader: exploreLoader,
        },
        {
          path: 'user/:username',
          element: <User />,
          loader: userLoader,
          action: userAction,
        },
        {
          path: 'post/:id',
          element: <Post />,
          loader: postLoader,
          action: postAction,
        },
        {
          path: 'new-post',
          element: <NewPostForm />,
          action: newPostAction,
        },
      ],
    },
    {
      path: 'welcome',
      element: <Landing />,
      loader: landingLoader,
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
      // TODO: Merge login and landing
    },
  ]);

  return <RouterProvider router={router} />;
}
