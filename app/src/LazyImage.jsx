import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setError(false);
    
    // Create a new image to preload
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setError(true);
    };
  }, [src]);

  return (
    <>
      {!isLoaded && !error && (
        <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
          <div className="animate-pulse flex space-x-2">
            <div className="h-2 w-2 bg-white rounded-full"></div>
            <div className="h-2 w-2 bg-white rounded-full"></div>
            <div className="h-2 w-2 bg-white rounded-full"></div>
          </div>
        </div>
      )}
      
      {error && (
        <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
          <div className="text-white">Image failed to load</div>
        </div>
      )}
      
      <img 
        src={src} 
        alt={alt} 
        className={`${className} ${isLoaded ? 'block' : 'hidden'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
};

export default LazyImage;