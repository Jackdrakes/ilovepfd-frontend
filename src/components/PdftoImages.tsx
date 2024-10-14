"use client";

import { useState } from 'react';
import Image from 'next/image';

const PdftoImagesPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImages([]);

    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log('hostname---', process.env.API_HOSTNAME)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/convert/pdf2image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert PDF');
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition && contentDisposition.match(/filename(?:\*=UTF-8'')?="?([^";]+)"?/i);
      const filename = filenameMatch ? filenameMatch[1] : 'converted_images.zip';

      // Create a Blob from the response
      const zipBlob = await response.blob();

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err)
      setError('Failed to convert PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex-grow min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
              PDF to Image Converter
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="w-full px-4 py-3 rounded-lg text-zinc-600 border-2 border-gray-300 focus:outline-none focus:border-purple-500 transition duration-300"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
                disabled={loading}
              >
                {loading ? 'Converting...' : 'Convert PDF to Images'}
              </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            {images.length > 0 && (
              <div className="flex justify-center mt-6">
                {images.map((image, index) => (
                  <Image src={image} alt={`Image ${index + 1}`} width={100} height={100} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* <footer className="mt-8 text-center text-white">
          <p>&copy; 2023 PDF to Image Converter. All rights reserved.</p>
        </footer> */}
      </main>
    </div>
  );
}

export default PdftoImagesPage