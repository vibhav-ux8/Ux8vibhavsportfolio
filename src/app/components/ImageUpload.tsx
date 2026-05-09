import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

interface ImageUploadProps {
  value?: string; // Current image URL
  onChange: (url: string) => void;
  onRemove?: () => void;
  path?: string; // Storage path prefix (e.g., 'projects/', 'blog/')
  label?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  path = '',
  label = 'Upload Image',
  className = ''
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      await handleUpload(imageFile);
    } else {
      setError('Please drop an image file');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const url = await uploadImage(file, path);
      onChange(url);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Upload failed. Please try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
    onChange('');
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}

      <AnimatePresence mode="wait">
        {value ? (
          // Preview Mode
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative group rounded-lg overflow-hidden border-2 border-border bg-muted"
          >
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-64 object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </motion.button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm truncate">{value}</p>
            </div>
          </motion.div>
        ) : (
          // Upload Mode
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />

            <div className="flex flex-col items-center gap-4">
              {isUploading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-12 h-12 text-primary" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`p-4 rounded-full ${
                      isDragging ? 'bg-primary/10' : 'bg-muted'
                    }`}
                  >
                    {isDragging ? (
                      <Upload className="w-8 h-8 text-primary" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                  </motion.div>

                  <div>
                    <p className="text-sm font-medium mb-1">
                      {isDragging ? 'Drop image here' : 'Drag & drop image here'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      or click to browse (max 10MB)
                    </p>
                  </div>
                </>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
