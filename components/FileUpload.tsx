import React, { useCallback } from 'react';
import { UploadedFile } from '../types';

interface FileUploadProps {
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles }) => {

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: UploadedFile[] = [];
      
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();

        await new Promise<void>((resolve) => {
          reader.onload = (e) => {
            const result = e.target?.result as string;
            // Extract base64 part
            const base64 = result.split(',')[1];
            
            newFiles.push({
              file,
              previewUrl: file.type.startsWith('image/') ? result : '',
              base64,
              mimeType: file.type
            });
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }

      setFiles(prev => [...prev, ...newFiles]);
    }
  }, [setFiles]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Project Documentation & Assets
      </label>
      <div className="flex flex-col items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> UI Mockups, Diagrams, or Specs</p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or PDF (converted to img)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} accept="image/*,application/pdf" />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {files.map((f, idx) => (
            <div key={idx} className="relative group border rounded-lg p-2 bg-white shadow-sm">
              <button 
                onClick={() => removeFile(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
              {f.previewUrl ? (
                <img src={f.previewUrl} alt="preview" className="h-20 w-full object-contain" />
              ) : (
                <div className="h-20 flex items-center justify-center text-gray-400 text-xs text-center break-words">
                    {f.file.name}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
