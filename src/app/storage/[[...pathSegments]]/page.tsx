import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSystemEntryView } from "@/components/file-system-entry-view";
import { listDirectory } from "@/lib/services";

export default async function Page({
  params,
}: {
  params: Promise<{ pathSegments?: string[] }>;
}) {
  const pathSegments = (await params).pathSegments ?? [];
  const directoryPath = pathSegments.join("/");
  const fileSystemEntries = await listDirectory(directoryPath);

  return (
    <div className="flex h-full flex-col items-center justify-center p-8">
      <Card className="flex h-full max-h-[40rem] w-full max-w-[40rem] flex-col">
        <CardHeader>
          <CardTitle>File Server</CardTitle>
        </CardHeader>

        <CardContent className="flex h-full flex-col overflow-y-auto">
          {fileSystemEntries.map((fileSystemEntry, index) => (
            <FileSystemEntryView key={index} {...fileSystemEntry} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
