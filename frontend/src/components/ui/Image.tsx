import React, { useState, useEffect, useRef } from "react";

interface Props {
  src: string;
  alt: string;
}

const Image: React.FC<Props> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;

    if (img) {
      const handleLoad = () => setIsLoaded(true);
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener("load", handleLoad);
        return () => img.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  return (
    <div className={`blurred-img ${isLoaded ? "loaded" : ""}`}>
      <img ref={imgRef} src={src} alt={alt} loading="lazy" />
    </div>
  );
};

export default Image;
