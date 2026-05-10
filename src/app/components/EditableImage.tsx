import { useState } from "react";
import { Settings, Upload, Trash2, X } from "lucide-react";
import { useAdminView } from "../contexts/AdminViewContext";
import { ImageUpload } from "./ImageUpload";
import { motion, AnimatePresence } from "motion/react";

interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  onReplace?: (newUrl: string) => void;
  onDelete?: () => void;
  uploadPath?: string;
  editable?: boolean;
}

export function EditableImage({
  src,
  alt,
  className = "",
  onReplace,
  onDelete,
  uploadPath = "projects/",
  editable,
}: EditableImageProps) {
  const { isAdminView } = useAdminView();
  const [showMenu, setShowMenu] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);

  const canEdit = editable !== undefined ? editable : isAdminView;

  if (!canEdit) {
    return <img src={src} alt={alt} className={className} />;
  }

  const handleReplace = (newUrl: string) => {
    if (onReplace) {
      onReplace(newUrl);
    }
    setShowReplaceModal(false);
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this image?")) {
      if (onDelete) {
        onDelete();
      }
      setShowMenu(false);
    }
  };

  return (
    <>
      <div className="relative group w-full block">
        <img src={src} alt={alt} className={className} />

        {/* Settings Icon - Always visible on hover with higher z-index */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2.5 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg hover:bg-white hover:scale-105 z-[100]"
          title="Image settings"
        >
          <Settings className="w-4 h-4 text-gray-700" />
        </button>

        {/* Popup Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-16 left-3 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden z-[200] min-w-[160px]"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReplaceModal(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 transition-colors text-left"
              >
                <Upload className="w-4 h-4" />
                Replace
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition-colors text-left border-t border-gray-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click outside to close menu */}
        {showMenu && (
          <div
            className="fixed inset-0 z-[99]"
            onClick={() => setShowMenu(false)}
          />
        )}
      </div>

      {/* Replace Modal */}
      <AnimatePresence>
        {showReplaceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Replace Image</h3>
                <button
                  onClick={() => setShowReplaceModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <ImageUpload
                value=""
                onChange={handleReplace}
                path={uploadPath}
                label="Upload new image"
              />

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowReplaceModal(false)}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
