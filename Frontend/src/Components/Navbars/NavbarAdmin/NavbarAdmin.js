import React from 'react'

import './NavbarAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';

// passer en props
export default function NavbarAdmin({ onMenuClick }) {
 
  return (
  <div className="mainContent " >
  <div className="mainContentLeft" onClick={onMenuClick}>
    <FontAwesomeIcon icon={faBars} className='ms-3' />
  </div>
  <div className="mainContentRight">
  <FontAwesomeIcon icon={faBell} className='me-3' />
  </div>
</div>
  )
}

