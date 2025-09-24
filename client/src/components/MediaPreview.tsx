import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPreviewProps {
  files: File[];
  onRemove: (index: number) => void;
  onUpload: () => void;
  maxFiles?: number;
  className?: string;
}

export default function MediaPreview({ 
  files, 
  onRemove, 
  onUpload, 
  maxFiles = 4,
  className 
}: MediaPreviewProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    console.log('Files dropped:', e.dataTransfer.files);
    // TODO: Handle file drop logic
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* File Upload Area */}
      {files.length < maxFiles && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            "hover:border-primary hover:bg-primary/5 cursor-pointer"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => {
            console.log('Upload area clicked');
            onUpload();
          }}
          data-testid="upload-area"
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Images and videos up to 10MB
          </p>
        </div>
      )}

      {/* File Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {files.map((file, index) => {
            const isVideo = file.type.startsWith('video/');
            const isImage = file.type.startsWith('image/');
            const url = URL.createObjectURL(file);

            return (
              <div 
                key={index} 
                className="relative group aspect-video bg-muted rounded-lg overflow-hidden"
                data-testid={`media-item-${index}`}
              >
                {isImage && (
                  <img 
                    src={url} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                {isVideo && (
                  <video 
                    src={url} 
                    className="w-full h-full object-cover"
                    muted
                  />
                )}
                {!isImage && !isVideo && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{file.name}</p>
                    </div>
                  </div>
                )}
                
                {/* File type indicator */}
                <div className="absolute top-2 left-2">
                  {isVideo && (
                    <div className="bg-black/50 rounded px-2 py-1">
                      <Video className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Remove button */}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    console.log('Remove file:', index);
                    onRemove(index);
                  }}
                  data-testid={`button-remove-${index}`}
                >
                  <X className="h-3 w-3" />
                </Button>
                
                {/* File info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-xs text-white truncate">{file.name}</p>
                  <p className="text-xs text-white/70">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {files.length >= maxFiles && (
        <p className="text-xs text-muted-foreground text-center">
          Maximum {maxFiles} files allowed
        </p>
      )}
    </div>
  );
}