import { FileIcon } from "@/components/file-icon";

interface FileDisplayProps {
  filename: string;
}

export function FileDisplay({ filename }: FileDisplayProps) {
  const downloadUrl = `/api/files/${filename}`;

  return (
    <a
      href={downloadUrl}
      download={filename}
      className="hover:bg-muted flex flex-row items-center gap-2 rounded-md p-2"
    >
      <FileIcon filename={filename} />
      <span className="line-clamp-1">{filename}</span>
    </a>
  );
}
