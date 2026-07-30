import React, { useEffect, useState, useCallback } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiDownload, FiShare2, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ url: string; caption?: string }>;
  initialIndex: number;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    },
    [isOpen, handlePrev, handleNext, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `ganesha-bandarupally-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(currentImage.url, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Maha Ganapati Committee Bandarupally',
          text: currentImage.caption || 'Check out this beautiful festival image!',
          url: currentImage.url,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentImage.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
        {/* Close Area */}
        <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

        {/* Top bar tools */}
        <div className="absolute top-4 left-0 right-0 z-10 flex justify-between items-center px-6 text-white">
          <span className="text-sm font-medium text-neutral-400">
            {currentIndex + 1} / {images.length}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-neutral-800/80 border border-neutral-700/50 hover:bg-neutral-700 hover:scale-105 active:scale-95 transition-all text-neutral-200"
              title="Download Image"
            >
              <FiDownload className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-neutral-800/80 border border-neutral-700/50 hover:bg-neutral-700 hover:scale-105 active:scale-95 transition-all text-neutral-200"
              title="Share Link"
            >
              {copied ? <FiCheck className="w-5 h-5 text-green-400" /> : <FiShare2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-neutral-800/80 border border-neutral-700/50 hover:bg-neutral-700 hover:scale-105 active:scale-95 transition-all text-neutral-200"
              title="Close Lightbox"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-10 p-3 rounded-full bg-neutral-800/60 border border-neutral-700/30 text-white hover:bg-neutral-700 transition-all hover:scale-105 active:scale-95"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        {/* Image Content container */}
        <div className="relative z-10 max-w-[85vw] max-h-[80vh] flex flex-col items-center">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            src={currentImage.url}
            alt={currentImage.caption || 'Ganesha Gallery'}
            className="object-contain max-w-full max-h-[75vh] select-none rounded shadow-2xl border border-neutral-800"
          />

          {currentImage.caption && (
            <motion.p
              key={`cap-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 px-4 py-2 bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-sm rounded-lg text-center font-medium max-w-lg select-text"
            >
              {currentImage.caption}
            </motion.p>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-10 p-3 rounded-full bg-neutral-800/60 border border-neutral-700/30 text-white hover:bg-neutral-700 transition-all hover:scale-105 active:scale-95"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      </div>
    </AnimatePresence>
  );
};
export default ImageLightbox;
