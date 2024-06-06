import React from 'react';
import { Outlet } from 'react-router-dom';
import RequireAuth from '@components/auth/RequireAuth';
import NavBar from '@components/navbar/NavBar';

export default function RequireAuthLayout() {
  return (
    <RequireAuth>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </RequireAuth>
  );
}
