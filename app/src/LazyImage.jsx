import React from 'react'

const LazyImage = ({ src, alt, className, isGalleryItem, eventName }) => {
  if (isGalleryItem) {
    return (
      <div className="relative group">
        <img
          src={src}
          alt={alt}
          className={`${className} transition-transform duration-500 group-hover:scale-110`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-lg mb-2">{eventName}</p>
          <div className="space-x-2">
            <button className="bg-white text-black px-4 py-2 rounded">View Full Gallery</button>
            <button className="bg-white text-black px-4 py-2 rounded">Schedule</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  )
}

export default LazyImage