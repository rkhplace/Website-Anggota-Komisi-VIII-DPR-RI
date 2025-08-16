'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <button 
            onClick={() => scrollToSection('beranda')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          >
            <Image 
              src="/black-logo.png" // path dari folder public
              alt="SRG Logo"
              width={160} 
              height={36}
              className="h-10 w-auto"
            />
          </button>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('beranda')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection('berita')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Berita
            </button>
            <button
              onClick={() => scrollToSection('profil')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Profil
            </button>
            <button
              onClick={() => scrollToSection('agenda')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Agenda
            </button>
            <button
              onClick={() => scrollToSection('galeri')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Galeri
            </button>
            <button
              onClick={() => scrollToSection('kontak')}
              className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Hubungi Saya
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <nav className="py-6 space-y-4 border-t border-gray-100">
            <button
              onClick={() => scrollToSection('beranda')}
              className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium py-3 px-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection('berita')}
              className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium py-3 px-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
            >
              Berita
            </button>
            <button
              onClick={() => scrollToSection('profil')}
              className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium py-3 px-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
            >
              Profil
            </button>
            <button
              onClick={() => scrollToSection('agenda')}
              className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium py-3 px-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
            >
              Agenda
            </button>
            <button
              onClick={() => scrollToSection('galeri')}
              className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium py-3 px-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
            >
              Galeri
            </button>
            <button
              onClick={() => scrollToSection('kontak')}
              className="block w-full text-center bg-gray-900 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Hubungi Saya
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}


