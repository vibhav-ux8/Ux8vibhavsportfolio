import { useState, useRef, useEffect } from 'react';
import { Settings, Edit2, Copy, Archive, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminActionMenuProps {
  onEdit: () => void;
  onDuplicate: () => void;
  onArchive: () => void;
  onDelete: () => void;
  itemType?: 'project' | 'blog';
  isArchived?: boolean;
}

export function AdminActionMenu({
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
  itemType = 'project',
  isArchived = false
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
        className="absolute top-3 left-3 z-10 p-2 bg-background/95 backdrop-blur-sm hover:bg-background rounded-full shadow-lg transition-all hover:shadow-xl border border-border"
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
            className="absolute top-14 left-3 z-20 bg-card rounded-lg shadow-xl border border-border min-w-[180px] overflow-hidden"
          >
            <div className="py-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                  onEdit();
                }}
                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-muted transition-colors text-sm text-card-foreground"
              >
                <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                  onDuplicate();
                }}
                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-muted transition-colors text-sm text-card-foreground"
              >
                <Copy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Duplicate</span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                  onArchive();
                }}
                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-muted transition-colors text-sm text-card-foreground"
              >
                <Archive className={`w-4 h-4 ${isArchived ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`} />
                <span>{isArchived ? 'Unarchive' : 'Archive'}</span>
              </button>

              <div className="border-t border-border my-1" />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                  onDelete();
                }}
                className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-destructive/10 transition-colors text-sm text-destructive"
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
