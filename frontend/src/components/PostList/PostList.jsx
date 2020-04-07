import React, { useState } from 'react';
import Masonry from 'react-masonry-component';
import PostItem from './PostItem';
import './PostList.scss';

function PostList() {
  const [photos, setPhotos] = useState([]);

  const masonryOption = {
    itemSelector: '.post-item',
    gutter: '.post-gutter',
    columnWidth: '.post-sizer',
    percentPosition: true
  }
  
  return (
    <section className="post-list">
      <div className="global-container">
        <ul className="post-items">
          <Masonry
            elementType={'ul'}
            options={masonryOption}
          >
            <div className="post-gutter" />
            <div className="post-sizer" />
            {photos.length > 0 && photos.map((photo, index) => {
              return <PostItem key={index} {...photo} />
            })}
          </Masonry>
        </ul>
      </div>
    </section>
  )
}

export default PostList
