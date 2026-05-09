import { useState, useRef, useEffect } from 'react';
import { Settings, Edit2, Copy, Folder, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminActionMenuProps {
  onEdit: () => void;
  onDuplicate: () => void;
  onMoveTo?: () => void;
  onDelete: () => void;
  itemType?: 'project' | 'blog';
}

export function AdminActionMenu({
  onEdit,
  onDuplicate,
  onMoveTo,
  onDelete,
  itemType = 'project'
}: AdminActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="absolute top-3 left-3 z-10 p-2 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full shadow-lg transition-all hover:shadow-xl border border-border/50"
        title="Admin actions"
      >
        <Settings className="w-4 h-4 text-foreground/70 hover:text-foreground" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-14 left-3 z-20 bg-white rounded-lg shadow-xl border border-border/50 min-w-[180px] overflow-hidden"
          >
            <div className="py-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                  onEdit();
                }}
                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-muted transition-colors text-sm"
              >
                <Edit2 className="w-4 h-4 text-blue-600" />
                <span>Edit</span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                  onDuplicate();
                }}
                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-muted transition-colors text-sm"
              >
                <Copy className="w-4 h-4 text-purple-600" />
                <span>Duplicate</span>
              </button>

              {onMoveTo && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                    onMoveTo();
                  }}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-muted transition-colors text-sm"
                >
                  <Folder className="w-4 h-4 text-amber-600" />
                  <span>Move to</span>
                </button>
              )}

              <div className="border-t border-border/50 my-1" />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                  onDelete();
                }}
                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-red-50 transition-colors text-sm text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
