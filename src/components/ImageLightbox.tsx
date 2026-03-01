"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageLightboxProps {
  isOpen?: boolean;
  onClose?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  // Simple image props (when used as standalone image)
  src?: string;
  alt?: string;
  className?: string;
}

export function ImageLightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  subtitle,
  src,
  alt,
  className
}: ImageLightboxProps) {
  // If used as a simple image (not a lightbox), render just the img
  if (!isOpen && src) {
    return (
      <img
        src={src}
        alt={alt || "Image"}
        className={className}
      />
    );
  }

  // Lightbox modal functionality
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded-2xl overflow-hidden border-4 border-amber-500/30 shadow-2xl shadow-amber-500/20">
            <img
              src={imageSrc}
              alt={imageAlt || "Image"}
              className="w-full h-auto object-contain max-h-[80vh]"
            />
          </div>

          {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6 text-center"
            >
              {title && (
                <h3 className="text-2xl font-bold text-white mb-2">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-amber-400 font-semibold">
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}