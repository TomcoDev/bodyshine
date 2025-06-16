
import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';

interface NavbarProps {
  setCurrentPage: (page: Page) => void;
  currentPage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Inicio', page: 'home' },
    { label: 'Productos', page: 'products' },
    { label: 'Prueba Virtual', page: 'tryon' },
    { label: 'Citas', page: 'appointments' },
    { label: 'Asesor IA', page: 'advisor' },
    { label: 'Bienestar', page: 'wellness' },
  ];

  const handleMobileLinkClick = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);


  return (
    <nav className="bg-white shadow-md sticky top-0 z-40" ref={navRef}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div 
          onClick={() => handleMobileLinkClick('home')} 
          className="text-3xl font-bold text-primary cursor-pointer font-serif"
          role="button"
          tabIndex={0}
          aria-label="Ir a la página de inicio de BodyShine"
        >
          BodyShine
        </div>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              className={`px-3 py-2 rounded-md text-sm font-medium
                ${currentPage === item.page 
                  ? 'bg-primary text-white' 
                  : 'text-neutral-700 hover:bg-primary/10 hover:text-primary'
                } transition-colors duration-150`}
              aria-current={currentPage === item.page ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="Abrir menú de navegación móvil"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-full">
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.page}>
                <button
                  onClick={() => handleMobileLinkClick(item.page)}
                  className={`w-full text-left px-6 py-3 font-medium
                    ${currentPage === item.page 
                      ? 'bg-primary text-white' 
                      : 'text-neutral-700 hover:bg-primary/10 hover:text-primary'
                    } transition-colors duration-150`}
                   aria-current={currentPage === item.page ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
