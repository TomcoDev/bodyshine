import React, { useState } from 'react';
import { MOCK_VIRTUAL_LOOKS } from '../constants';
import { VirtualLook } from '../types'; // Changed: Import VirtualLook from types

const VirtualTryOn: React.FC = () => {
  const [selectedLook, setSelectedLook] = useState<VirtualLook | null>(MOCK_VIRTUAL_LOOKS[0] || null);
  const [filter, setFilter] = useState<'Maquillaje' | 'Peinado' | 'Todos'>('Todos');

  const filteredLooks = MOCK_VIRTUAL_LOOKS.filter(look => 
    filter === 'Todos' || look.type === filter
  );

  const handleTryOnSimulated = () => {
    if (selectedLook) {
      alert(`Simulación de Prueba Virtual:\n\nLook: ${selectedLook.name}\nTipo: ${selectedLook.type}\n\nEn una aplicación real, esto activaría la cámara y aplicaría el look usando Realidad Aumentada.`);
    } else {
      alert("Por favor, selecciona un look de la galería primero.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-black mb-2 font-serif">Prueba Virtual de Looks</h1>
      <p className="text-black mb-8">
        Experimenta con diferentes estilos de maquillaje y peinados. 
        <span className="block text-sm text-secondary">(Funcionalidad de RA simulada para demostración)</span>
      </p>

      <div className="flex justify-center space-x-4 mb-8">
        {(['Todos', 'Maquillaje', 'Peinado'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors
              ${filter === type ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-primary/20'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Main "Try-On" Area */}
        <div className="md:col-span-7 lg:col-span-8 bg-neutral-200 rounded-lg p-4 shadow-lg min-h-[400px] flex flex-col items-center justify-center">
          {selectedLook ? (
            <>
              <img 
                src={selectedLook.imageUrl} 
                alt={`Look: ${selectedLook.name}`} 
                className="w-full max-w-md h-auto object-contain rounded-md mb-4 shadow-md"
              />
              <h3 className="text-2xl font-semibold text-neutral-800">{selectedLook.name}</h3>
              <p className="text-neutral-600 text-center">{selectedLook.description}</p>
              <button 
                onClick={handleTryOnSimulated}
                className="mt-4 bg-secondary text-white py-2 px-6 rounded-lg hover:bg-opacity-80 transition duration-200"
                aria-label={`Probar el look ${selectedLook.name} (simulado)`}
              >
                ¡Probar este Look! (Simulado)
              </button>
            </>
          ) : (
            <p className="text-neutral-500 text-xl">Selecciona un look de la galería para previsualizar.</p>
          )}
           <p className="text-xs text-neutral-500 mt-6 text-center">
            Nota: En una aplicación real, aquí verías tu imagen de la cámara con el look aplicado mediante Realidad Aumentada.
          </p>
        </div>

        {/* Gallery of Looks */}
        <div className="md:col-span-5 lg:col-span-4 bg-white p-4 rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
          <h2 className="text-xl font-semibold text-neutral-700 mb-4">Galería de Looks</h2>
          {filteredLooks.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredLooks.map(look => (
                <div 
                  key={look.id} 
                  className={`p-2 rounded-md cursor-pointer border-2 transition-all
                    ${selectedLook?.id === look.id ? 'border-primary shadow-md' : 'border-transparent hover:border-primary/50 hover:shadow-sm'}`}
                  onClick={() => setSelectedLook(look)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedLook?.id === look.id}
                  aria-label={`Seleccionar look: ${look.name}`}
                >
                  <img src={look.imageUrl} alt={look.name} className="w-full h-32 object-cover rounded mb-2" />
                  <p className="text-sm font-medium text-neutral-700 truncate">{look.name}</p>
                  <p className="text-xs text-neutral-500">{look.type}</p>
                </div>
              ))}
            </div>
          ) : (
             <p className="text-neutral-500 text-center py-4">No hay looks disponibles para este filtro.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;