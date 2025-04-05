import { FileIcon } from "lucide-react";
import Link from "next/link";

interface FileViewProps {
  name: string;
  path: string;
}

export function FileView({ name, path }: FileViewProps) {
  return (
    <Link
      href={`/api/files/${path}`}
      download={name}
      className="hover:bg-muted flex flex-row items-center justify-between gap-2 rounded-md p-2"
    >
      <div className="flex flex-row items-center gap-2">
        <FileIcon size={16} className="opacity-60" />
        <span className="line-clamp-1">{name}</span>
      </div>
    </Link>
  );
}
