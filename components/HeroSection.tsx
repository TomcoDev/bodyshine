
import React from 'react';
import { Page } from '../types';

interface HeroSectionProps {
  setCurrentPage: (page: Page) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-gradient-to-br from-primary/70 via-secondary/30 to-white py-20 px-4 text-center min-h-[calc(100vh-68px)] flex flex-col justify-center items-center">
      <div className="container mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold font-serif text-neutral-600 mb-6">
          Bienvenida a <span className="text-primary">BodyShine</span>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto">
          Revoluciona tu experiencia de belleza y cuidado personal. Descubre productos limpios, prueba looks con RA y conecta con tu bienestar integral.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-6">
          <button
            onClick={() => setCurrentPage('products')}
            className="bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-80 transition duration-300 text-lg"
          >
            Explorar Productos
          </button>
          <button
            onClick={() => setCurrentPage('advisor')}
            className="bg-secondary text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-80 transition duration-300 text-lg"
          >
            Asesor de Belleza IA
          </button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/70 p-6 rounded-xl shadow-lg backdrop-blur-md">
                <h3 className="text-xl font-semibold text-primary mb-2">Belleza Limpia</h3>
                <p className="text-neutral-600 text-sm">Encuentra productos seguros y transparentes, adaptados a ti.</p>
            </div>
            <div className="bg-white/70 p-6 rounded-xl shadow-lg backdrop-blur-md">
                <h3 className="text-xl font-semibold text-primary mb-2">Prueba Virtual</h3>
                <p className="text-neutral-600 text-sm">Experimenta con maquillaje y peinados usando nuestra (simulada) RA.</p>
            </div>
            <div className="bg-white/70 p-6 rounded-xl shadow-lg backdrop-blur-md">
                <h3 className="text-xl font-semibold text-primary mb-2">Bienestar Holístico</h3>
                <p className="text-neutral-600 text-sm">Consejos y rutinas para un cuidado personal integral.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;