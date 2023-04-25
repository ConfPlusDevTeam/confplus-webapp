import React, { useState } from 'react';
import styles from './sidebar.module.scss';

export default function SidebarMenu() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className={styles.sidebarMenu}>
      <button className={`${styles.tabButton} ${ activeTab === 'welcome' ? styles.active : ''}`}
        onClick={() => setActiveTab('welcome')}>
        Welcome
      </button>
      <button className={`${styles.tabButton} ${activeTab === 'schedule' ? styles.active : ''}`}
        onClick={() => setActiveTab('schedule')} >
        Schedule
      </button>
      <button className={`${styles.tabButton} ${activeTab === 'about' ? styles.active : ''}`}
        onClick={() => setActiveTab('about')}>
        About
      </button>
    </div>
  )
}