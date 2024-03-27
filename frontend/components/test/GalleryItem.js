import React from "react";

function GalleryItem({ imageUrl, index, updateActiveImage }) {
  return (
    <div className="gallery-item" onClick={updateActiveImage}>
      <img src={imageUrl} alt={`Image ${index + 1}`} />
    </div>
  );
}

export default GalleryItem;
