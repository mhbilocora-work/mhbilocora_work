/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, Trash2 } from 'lucide-react';
import { getImage, saveImage, deleteImage, compressImage } from '../utils/imageDb';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  itemId: string;
  fallbackUrl: string;
  alt?: string;
  className?: string;
}

export function SmartImage({ itemId, fallbackUrl, alt, className, ...props }: SmartImageProps) {
  const [customSrc, setCustomSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadCustomImage = async () => {
    try {
      const dataUrl = await getImage(itemId);
      setCustomSrc(dataUrl);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomImage();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ itemId: string; dataUrl: string | null }>;
      if (customEvent.detail && customEvent.detail.itemId === itemId) {
        setCustomSrc(customEvent.detail.dataUrl);
      }
    };

    window.addEventListener('dukecare-image-updated', handleUpdate);
    return () => {
      window.removeEventListener('dukecare-image-updated', handleUpdate);
    };
  }, [itemId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const compressedDataUrl = await compressImage(file);
      await saveImage(itemId, compressedDataUrl);
      setCustomSrc(compressedDataUrl);

      // Trigger custom event so all other components using this image sync up
      const event = new CustomEvent('dukecare-image-updated', {
        detail: { itemId, dataUrl: compressedDataUrl }
      });
      window.dispatchEvent(event);
    } catch (err) {
      console.error('Failed to save image', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await deleteImage(itemId);
      setCustomSrc(null);

      const event = new CustomEvent('dukecare-image-updated', {
        detail: { itemId, dataUrl: null }
      });
      window.dispatchEvent(event);
    } catch (err) {
      console.error('Failed to remove image', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const src = customSrc || fallbackUrl;

  return (
    <div className={`relative group/img overflow-hidden w-full h-full ${className || ''}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
        {...props}
      />
      
      {/* Sleek Customization Overlay */}
      <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 pointer-events-none z-10">
        <button
          type="button"
          onClick={triggerUpload}
          className="pointer-events-auto bg-emerald-900 hover:bg-emerald-850 text-amber-50 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg transform translate-y-2 group-hover/img:translate-y-0 duration-300 cursor-pointer border border-emerald-800"
        >
          <Camera className="w-4 h-4 text-amber-200" />
          <span>{customSrc ? 'Replace Photo' : 'Upload Your Photo'}</span>
        </button>
        
        {customSrc && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="pointer-events-auto bg-stone-900/90 text-stone-300 p-2 rounded-xl text-xs hover:text-red-400 hover:bg-stone-950 transition-all shadow-md transform translate-y-2 group-hover/img:translate-y-0 duration-300 cursor-pointer border border-stone-850"
            title="Reset to default image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Status badge when custom image is active */}
      {customSrc && (
        <div className="absolute top-3 right-3 bg-emerald-900/95 text-amber-50 px-2.5 py-1 rounded-lg text-[9px] font-mono tracking-wider font-bold border border-emerald-850 shadow z-10">
          YOUR PHOTO
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[2px] flex items-center justify-center z-20">
          <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      )}
    </div>
  );
}
export default SmartImage;
