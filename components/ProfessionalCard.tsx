
import React from 'react';
import { Professional } from '../types';

interface ProfessionalCardProps {
  professional: Professional;
  onBook: (professional: Professional) => void;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row">
      <img src={professional.imageUrl} alt={professional.name} className="w-full md:w-1/3 h-64 md:h-auto object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-neutral-800 mb-1">{professional.name}</h3>
        <p className="text-primary font-medium mb-2">{professional.specialty}</p>
        <p className="text-neutral-600 text-sm mb-1"><span className="font-medium">Ubicación:</span> {professional.location}</p>
        {professional.rating && (
            <p className="text-sm text-neutral-600 mb-3"><span className="font-medium">Valoración:</span> <span className="text-yellow-500">{'★'.repeat(Math.floor(professional.rating))}{'☆'.repeat(5 - Math.floor(professional.rating))} ({professional.rating})</span></p>
        )}
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-neutral-700 mb-1">Servicios Destacados:</h4>
          <ul className="list-disc list-inside text-sm text-neutral-600">
            {professional.services.slice(0, 2).map(service => (
              <li key={service.name}>{service.name} - ${service.price}</li>
            ))}
            {professional.services.length > 2 && <li>Y más...</li>}
          </ul>
        </div>
        
        <p className="text-xs text-neutral-500 mb-3"><span className="font-medium">Disponibilidad:</span> {professional.availability.join(', ')}</p>

        <button 
          onClick={() => onBook(professional)}
          className="mt-auto w-full md:w-auto bg-secondary text-white py-2 px-6 rounded-lg hover:bg-opacity-80 transition duration-200 text-sm font-medium self-start"
        >
          Reservar Cita
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
