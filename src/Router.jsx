import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Landing from '@pages/Landing';
import Login from '@pages/Login';
import User from '@pages/User';
import NewPostForm from '@pages/NewPost';
import Post from '@pages/Post';
import Timeline from '@pages/Timeline';
import Signup from '@pages/Signup';
import Error from '@pages/Error';

// Loaders
import homeLoader from '@pages/loaders/homeLoader';
import exploreLoader from '@pages/loaders/exploreLoader';
import userLoader from '@pages/loaders/userLoader';
import landingLoader from '@pages/loaders/landingLoader';
import postLoader from '@pages/loaders/postLoader';

// Actions
import newPostAction from '@pages/actions/newPostAction';
import signupAction from '@pages/actions/signupAction';
import userAction from '@pages/actions/userAction';
import postAction from '@pages/actions/postAction';

// Layouts
import RequireAuthLayout from './layouts/RequireAuthLayout';
import AccessLayout from './layouts/AccessLayout';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: 'welcome',
      element: <Landing />,
      loader: landingLoader,
      errorElement: <Error />,
    },
    {
      path: '/',
      element: <AccessLayout />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <Signup />,
          action: signupAction,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: '/',
      // Layout function wraps any of its children inside <RequireAuth>
      element: <RequireAuthLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Timeline />,
          loader: homeLoader,
        },
        {
          path: 'explore',
          element: <Timeline />,
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
  ]);

  return <RouterProvider router={router} />;
}
