import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation({ userObj }) {
  // 소셜 로그인이면 displayName이 있고, 그냥 로그인이면 없으므로
  const profileName = userObj.displayName || userObj.email.split('@')[0];

  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/profile'}>{profileName}의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
