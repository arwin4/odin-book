import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing, { landingLoader } from '@pages/Landing';
import Login from '@pages/Login';
import Home, { homeLoader } from '@pages/Home';
import User, { userAction, userLoader } from '@pages/User';
import NewPostForm, { newPostAction } from '@pages/NewPost';
import Post, { postAction, postLoader } from '@pages/Post';
import Error from '@pages/Error';
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
          element: <Home />,
          errorElement: <Error />,
          loader: homeLoader,
        },
        {
          path: 'user/:username',
          element: <User />,
          loader: userLoader,
          action: userAction,
          errorElement: <Error />,
        },
        {
          path: 'post/:id',
          element: <Post />,
          loader: postLoader,
          action: postAction,
          errorElement: <Error />,
        },
        {
          path: 'new-post',
          element: <NewPostForm />,
          action: newPostAction,
          errorElement: <Error />,
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
