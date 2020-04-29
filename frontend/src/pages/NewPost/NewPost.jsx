import React, { useState } from 'react';
import DropZone from '../../components/common/Modal/DropZone.jsx';
import './NewPost.scss';

function NewPost() {
  const [images, setImages] = useState([]);

  return (
    <div className="new-post">
      <div className="global-container">
        <div className="new-post-container">
          <DropZone
            dropZoneClass="image-upload"
            dropZoneMessageClass="image-upload-message"
            message="사진을 선택하세요."
            activeMessage=""
            images={images}
            setImages={setImages}
            previeImage={images[0] && images[0].preview}
            previeImageClass="image-preview"
          />
        </div>
      </div>
    </div>
  );
}

export default NewPost;
