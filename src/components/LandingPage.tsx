// landing page component
import React from 'react';
import Link from 'next/link';
import { Camera, Home, Wrench, Rocket } from 'lucide-react';

interface Tool {
  name: string;
  icon: 'camera' | 'home' | 'wrench' | 'rocket';
  description: string;
}

const tools: Tool[] = [
  { name: 'PDF Converter', icon: 'camera', description: 'Convert files to and from PDF format' },
  { name: 'PDF Merger', icon: 'home', description: 'Combine multiple PDFs into one' },
  { name: 'Image Editor', icon: 'wrench', description: 'Edit and enhance your images' },
  { name: 'File Compressor', icon: 'rocket', description: 'Reduce file sizes without losing quality' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <header className="container mx-auto py-16 text-center">
        <h1 className="text-6xl font-bold mb-4">Your Ultimate PDF Toolkit</h1>
        <p className="text-2xl mb-8">All the tools you need to work with PDFs and more, in one place.</p>
        <Link href="/tools" className="bg-white text-purple-600 px-8 py-3 rounded-full text-xl font-semibold hover:bg-opacity-90 transition duration-300">
          Get Started
        </Link>
      </header>

      <main className=" flex-grow container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-lg hover:bg-opacity-20 transition duration-300">
              <div className="text-4xl mb-4">
                {tool.icon === 'camera' ? <Camera /> : tool.icon === 'home' ? <Home /> : tool.icon === 'wrench' ? <Wrench /> : <Rocket />}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-200">{tool.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="container mx-auto py-8 text-center">
        <p>&copy; 2023 Your PDF Toolkit. All rights reserved.</p>
      </footer>
    </div>
  );
}