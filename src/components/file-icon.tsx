import { Icon } from "@iconify-icon/react";

const FILE_EXTENSION_TO_ICON_ATTRIBUTE: Record<string, string | undefined> = {
  // Programming languages
  html: "html",
  css: "css2",
  js: "javascript-official",
  ts: "typescript-official",
  jsx: "reactjs",
  tsx: "reactts",
  vue: "vue",
  astro: "astro",
  py: "python",
  c: "c3",
  cpp: "cpp3",
  cc: "cpp3",
  h: "cheader",
  hpp: "cppheader",
  go: "go",
  rust: "rust",
  zig: "zig",

  // Microsoft office
  doc: "word",
  docx: "word",
  xls: "excel",
  xlsx: "excel",
  ppt: "powerpoint",
  pptx: "powerpoint",

  // Text files
  txt: "text",
  md: "markdown",
  mdx: "mdx",

  // Images
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  bmp: "image",
  ico: "favicon",
  svg: "svg",
  webp: "image",

  // PDF
  pdf: "pdf2",

  // Other
  zip: "zip",
};

interface FileIconProps {
  filename: string;
}

export function FileIcon({ filename }: FileIconProps) {
  let iconAttribute: string;
  const fileExtension = filename.split(".").pop();
  if (fileExtension === undefined) {
    iconAttribute = "default-file";
  } else {
    iconAttribute =
      FILE_EXTENSION_TO_ICON_ATTRIBUTE[fileExtension] || "default-file";

    if (iconAttribute !== "default-file") {
      iconAttribute = `file-type-${iconAttribute}`;
    }
  }
  iconAttribute = `vscode-icons:${iconAttribute}`;

  return <Icon icon={iconAttribute} />;
}
