import { useState } from 'react';
import MediaPreview from '../MediaPreview';

// TODO: remove mock functionality
const createMockFile = (name: string, type: string, size: number): File => {
  const blob = new Blob(['mock file content'], { type });
  return new File([blob], name, { type, lastModified: Date.now() });
};

export default function MediaPreviewExample() {
  const [files, setFiles] = useState<File[]>([
    createMockFile('product-hero.jpg', 'image/jpeg', 2048000),
    createMockFile('demo-video.mp4', 'video/mp4', 8192000),
  ]);

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    console.log('Upload clicked');
    // Mock adding a file
    const newFile = createMockFile(`new-file-${Date.now()}.jpg`, 'image/jpeg', 1024000);
    setFiles([...files, newFile]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <MediaPreview 
        files={files}
        onRemove={handleRemove}
        onUpload={handleUpload}
      />
    </div>
  );
}