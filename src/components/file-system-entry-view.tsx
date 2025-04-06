import type { FileSystemEntry } from "@/models/file-system-entry";
import { FileIcon, FolderIcon } from "lucide-react";

interface FileSystemEntryViewProps extends FileSystemEntry {}

export function FileSystemEntryView({
  name,
  path,
  isDirectory,
}: FileSystemEntryViewProps) {
  const href = isDirectory ? `/storage/${path}` : `/api/download/${path}`;
  const download = isDirectory ? undefined : name;
  const Icon = isDirectory ? FolderIcon : FileIcon;

  return (
    <a
      href={href}
      download={download}
      className="hover:bg-muted flex flex-row items-center justify-between gap-2 rounded-md p-2"
    >
      <div className="flex flex-row items-center gap-2">
        <Icon size={16} className="opacity-60" />
        <span className="line-clamp-1">{name}</span>
      </div>
    </a>
  );
}
