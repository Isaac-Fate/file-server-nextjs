import { FolderIcon } from "lucide-react";
import Link from "next/link";

interface DirectoryViewProps {
  name: string;
  path: string;
}

export function DirectoryView({ name, path }: DirectoryViewProps) {
  return (
    <Link
      href={`/files/${path}`}
      className="hover:bg-muted group flex flex-row items-center justify-between gap-2 rounded-md p-2 hover:cursor-pointer"
    >
      <div className="flex flex-row items-center gap-2">
        <FolderIcon size={16} className="opacity-60" />
        <span className="line-clamp-1">{name}</span>
      </div>
    </Link>
  );
}
