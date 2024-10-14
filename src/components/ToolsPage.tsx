// pages/tools.tsx
import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';


interface Tool {
    name: string;
    icon:  'camera' | 'house' | 'wrench' | 'rocket';
    description: string;
    link: string;
  }
  
const tools: Tool[] = [
    { name: 'PDF to Image', icon: 'camera', link:'/pdf2image',description: 'Convert files to and from PDF format' },
    { name: 'PDF Merger', icon: 'house', link:'',description: 'Combine multiple PDFs into one' },
    { name: 'Image Editor', icon: 'wrench', link:'',description: 'Edit and enhance your images' },
    { name: 'File Compressor', icon: 'rocket', link:'',description: 'Reduce file sizes without losing quality' },
];

const ToolsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 to-blue-500 text-white">

      <header className="container mx-auto py-16 text-center">
        <h1 className="text-6xl font-bold mb-4">Choose a Tool</h1>
        <p className="text-2xl mb-8">Select a tool to get started with your PDF tasks.</p>
      </header>

      <main className="flex-grow container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-lg hover:bg-opacity-20 transition duration-300">
              <Link href={tool.link}>
                  <div className="text-4xl mb-4">
                    <Icon name={tool.icon} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-200">{tool.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className="container mx-auto py-8 text-center">
        <p>&copy; 2023 Your PDF Toolkit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ToolsPage;