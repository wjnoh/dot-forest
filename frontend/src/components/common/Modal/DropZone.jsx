import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

function DropZone({
  dropZoneClass,
  dropZoneMessageClass,
  message,
  activeMessage,
  images,
  setImages,
  previeImage,
  previeImageClass,
}) {
  useEffect(() => () => {
    images.forEach(file => URL.revokeObjectURL(file.preview));
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImages([
        ...images,
        ...acceptedFiles.map(file => {
          return {
            file,
            preview: URL.createObjectURL(file)
          }
        })
      ]);
    }
  });

  return (
    <div className={`drop-zone ${dropZoneClass}`} {...getRootProps()}>
      <input {...getInputProps()} />
      <span className={`drop-zone-message ${dropZoneMessageClass}`}>
        {isDragActive
            ? activeMessage
            : message
        }
      </span>
      {previeImage && <img src={previeImage} className={`${previeImageClass}`} alt="previeImage"/>}
    </div>
  )
}

export default DropZone
