import { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import { useAdminView } from "../contexts/AdminViewContext";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  editable?: boolean;
}

export function EditableText({
  value,
  onChange,
  className = "",
  multiline = false,
  rows = 3,
  placeholder = "",
  as: Component = "p",
  editable,
}: EditableTextProps) {
  const { isAdminView } = useAdminView();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const canEdit = editable !== undefined ? editable : isAdminView;

  if (!canEdit) {
    return <Component className={className}>{value}</Component>;
  }

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            rows={rows}
            className={`${className} w-full px-3 py-2 border-2 border-primary rounded-lg bg-background focus:outline-none resize-none`}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
              if (e.key === "Enter" && e.ctrlKey) handleSave();
            }}
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} w-full px-3 py-2 border-2 border-primary rounded-lg bg-background focus:outline-none`}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
              if (e.key === "Enter") handleSave();
            }}
          />
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors flex items-center gap-1"
          >
            <Check className="w-3 h-3" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Cancel
          </button>
          {multiline && (
            <span className="text-xs text-muted-foreground self-center ml-2">
              Ctrl+Enter to save
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group inline-block w-full">
      <Component className={className}>{value || placeholder}</Component>
      <button
        onClick={() => {
          setEditValue(value);
          setIsEditing(true);
        }}
        className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-muted rounded-lg"
        title="Edit text"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
