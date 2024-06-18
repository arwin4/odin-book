import React, { useRef } from 'react';

import './style/Access.css';
import { Outlet } from 'react-router-dom';

export default function AccessLayout() {
  const accessRef = useRef();

  return (
    <main>
      <div className="access" ref={accessRef}>
        <Outlet context={accessRef} />
      </div>
    </main>
  );
}
