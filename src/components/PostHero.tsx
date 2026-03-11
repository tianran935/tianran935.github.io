'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface PostHeroProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

// Validate image path - must start with / and not be empty
function isValidImagePath(src: string): boolean {
  if (!src || typeof src !== 'string') return false;
  // Valid paths should start with / or http
  return src.startsWith('/') || src.startsWith('http');
}

export default function PostHero({ src, alt, children }: PostHeroProps) {
  const [imgSrc, setImgSrc] = useState('/images/covers/default.jpg');

  // Only set the provided src if it's a valid path
  useEffect(() => {
    if (isValidImagePath(src)) {
      setImgSrc(src);
    }
  }, [src]);

  return (
    <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden -mx-6 md:mx-0 bg-zinc-100">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImgSrc('/images/covers/default.jpg')}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {children}
    </div>
  );
}
