import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface PhotoUploadProps {
  taskNumber: number;
  instruction: string;
  onUpload?: (photos: string[]) => void;
}

export function PhotoUpload({ taskNumber, instruction, onUpload }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [caption, setCaption] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPhotos.push(event.target.result as string);
            if (newPhotos.length === files.length) {
              const updatedPhotos = [...photos, ...newPhotos];
              setPhotos(updatedPhotos);
              if (onUpload) {
                onUpload(updatedPhotos);
              }
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    if (onUpload) {
      onUpload(updatedPhotos);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h4 className="text-lg text-gray-800 mb-2">任务{taskNumber}</h4>
      <p className="text-sm text-gray-600 mb-4">{instruction}</p>

      {/* 上传区域 */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors mb-4">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id={`photo-upload-${taskNumber}`}
        />
        <label
          htmlFor={`photo-upload-${taskNumber}`}
          className="cursor-pointer flex flex-col items-center gap-3"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-700 mb-1">点击上传照片</p>
            <p className="text-xs text-gray-500">支持 JPG、PNG 格式</p>
          </div>
        </label>
      </div>

      {/* 照片预览 */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo}
                  alt={`上传照片 ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* 照片说明 */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">为你的照片添加说明</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="描述一下你拍摄的美景，分享你的感受..."
              className="w-full min-h-24 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {photos.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm py-4">
          <ImageIcon className="w-5 h-5" />
          <span>还没有上传照片</span>
        </div>
      )}
    </div>
  );
}
