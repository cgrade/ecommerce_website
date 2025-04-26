"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  onImagesUploaded: (imageUrls: string[]) => void;
  initialImages?: string[];
} 

/**
 * @param {Function} onImageUploaded - Callback function when image is uploaded.
 * @param {string} initialImage - Initial image URL (optional).
 * @returns {JSX.Element} The image uploader component.
 * @description Allows users to upload images and displays a preview.
 */
export default function ImageUploader({ onImagesUploaded, initialImages = [] }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (!validFiles.length) {
      setUploadError('Please select image files (PNG, JPG, JPEG, etc.)');
      return;
    }
    // Show previews
    const readers = validFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    const previews = await Promise.all(readers);
    setPreviewUrls([...previewUrls, ...previews]);
    // Upload all files
    await uploadFiles(validFiles);
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to upload image');
        }
        const data = await response.json();
        urls.push(data.url);
      }
      onImagesUploaded([...previewUrls, ...urls]);
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files || []);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (!validFiles.length) {
      setUploadError('Please select image files (PNG, JPG, JPEG, etc.)');
      return;
    }
    // Show previews
    const readers = validFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    const previews = await Promise.all(readers);
    setPreviewUrls([...previewUrls, ...previews]);
    // Upload all files
    await uploadFiles(validFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
          isUploading ? 'opacity-50' : ''
        }`}
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrls.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-center">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="relative w-32 h-32">
                <Image
                  src={url}
                  alt={`Product image preview ${idx+1}`}
                  fill
                  className="object-contain rounded"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              {isUploading ? 'Uploading...' : 'Click or drag and drop to upload an image'}
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
          disabled={isUploading}
        />
      </div>

      {uploadError && (
        <p className="mt-2 text-sm text-red-600">{uploadError}</p>
      )}

      {previewUrls.length > 0 && (
        <p className="mt-2 text-xs text-gray-500">
          Click any image above to change or add more images
        </p>
      )}
    </div>
  );
}
