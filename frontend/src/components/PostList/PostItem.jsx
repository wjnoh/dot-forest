import React from 'react';
import './PostItem.scss';

function PostItem({ download_url }) {
  return (
    <li className="post-item">
      <div className="post-item-container">
        <img src={download_url} />
      </div>
    </li>
  );
}

export default PostItem;
