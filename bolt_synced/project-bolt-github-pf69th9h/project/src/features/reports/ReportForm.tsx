import React, { useState, useRef } from 'react';
import { Camera, Upload, Save } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

interface ReportFormProps {
  onSubmit: (data: ReportData) => void;
}

interface ReportData {
  description: string;
  photos: string[];
  signature: string;
}

function ReportForm({ onSubmit }: ReportFormProps) {
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const signatureRef = useRef<SignatureCanvas>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotos(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const signature = signatureRef.current?.toDataURL() || '';
    onSubmit({ description, photos, signature });
  };

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Photos</label>
        <div className="mt-1 flex items-center space-x-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Ajouter des photos
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Camera className="w-4 h-4 mr-2" />
            Prendre une photo
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          accept="image/*"
          multiple
          className="hidden"
        />
        {photos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Signature</label>
        <div className="mt-1 border rounded-lg">
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              className: 'signature-canvas w-full h-40 border rounded-lg'
            }}
          />
        </div>
        <button
          type="button"
          onClick={clearSignature}
          className="mt-2 text-sm text-blue-600 hover:text-blue-500"
        >
          Effacer la signature
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Enregistrer le rapport
        </button>
      </div>
    </form>
  );
}

export default ReportForm;