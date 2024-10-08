import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@hooks/useAuth';
import Router from './Router';
import './style/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
);
