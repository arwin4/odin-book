import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import RequireAuth from '@components/auth/RequireAuth';
import NavBar from '@components/navbar/NavBar';

export default function RequireAuthLayout() {
  const navigation = useNavigation();

  return (
    <RequireAuth>
      <NavBar />
      <main className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </main>
    </RequireAuth>
  );
}
