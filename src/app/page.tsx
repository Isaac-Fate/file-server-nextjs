"use client";

import { FileDisplay } from "@/components/file-display";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [filenames, setFilenames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFilenames = useCallback(async () => {
    const res = await fetch("/api/files", { method: "GET" });
    const filenames = await res.json();

    // Update state
    setFilenames(filenames);

    // Finish loading
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadFilenames();
  }, [loadFilenames]);

  return (
    <div className="flex h-full flex-col gap-8 p-8">
      <p className="text-2xl font-bold">File Server</p>

      <div className="flex h-full flex-col overflow-y-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filenames.map((filename) => (
            <FileDisplay key={filename} filename={filename} />
          ))
        )}
      </div>
    </div>
  );
}
