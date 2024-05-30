import React from 'react';
import { Outlet } from 'react-router-dom';
import RequireAuth from '@components/auth/RequireAuth';
import Navigation from '@components/navigation/Navigation';

export default function RequireAuthLayout() {
  return (
    <RequireAuth>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </RequireAuth>
  );
}
