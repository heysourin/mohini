import { useState, useCallback } from "react";
import { Upload, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  isAnalyzing?: boolean;
}

export default function PhotoUpload({ onImageSelect, isAnalyzing = false }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageSelect(file, result);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!preview ? (
        <div
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
            ${isDragOver 
              ? 'border-ring bg-accent/10' 
              : 'border-border hover:border-ring hover:bg-accent/5'
            }
            ${isAnalyzing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
          `}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          data-testid="upload-area"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="photo-upload"
            data-testid="input-file"
            disabled={isAnalyzing}
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-accent/10">
              <Camera className="h-8 w-8 text-accent-foreground" />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                Upload Your Photo
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to select
              </p>
              <p className="text-xs text-muted-foreground">
                For best results, use a clear, well-lit photo of your face
              </p>
            </div>
            
            <Button 
              onClick={() => document.getElementById('photo-upload')?.click()}
              variant="default"
              className="mt-2"
              data-testid="button-select-photo"
              disabled={isAnalyzing}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select Photo
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="rounded-xl overflow-hidden border border-border">
            <img
              src={preview}
              alt="Selected photo"
              className="w-full h-64 object-cover"
              data-testid="img-preview"
            />
          </div>
          
          {!isAnalyzing && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearImage}
              data-testid="button-clear-image"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/80 rounded-xl flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-2 border-ring border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-medium">Analyzing your skin tone...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}