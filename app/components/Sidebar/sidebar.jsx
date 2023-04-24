import React from 'react';
import styles from './sidebar.css';

export default function RootLayout({ children }) {
  return (
    <div>
      <nav id="sidebar-landingpage">
        <ul id="sidebar-list">
          <li><button className="button-landingpage" onClick={() => {}}>WELCOME</button></li>
          <li><button className="button-landingpage" onClick={() => {}}>SCHEDULE</button></li>
          <li><button className="button-landingpage" onClick={() => {}}>ABOUT</button></li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
