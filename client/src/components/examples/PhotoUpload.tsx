import PhotoUpload from '../PhotoUpload';

export default function PhotoUploadExample() {
  return (
    <PhotoUpload 
      onImageSelect={(file, preview) => {
        console.log('Image selected:', file.name, preview.substring(0, 50) + '...');
      }} 
    />
  );
}