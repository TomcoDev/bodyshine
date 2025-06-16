
import React, { useState } from 'react';
import { SkinType, HairConcern } from '../types'; // HairConcern might not be used here but good for consistency
import { SKIN_TYPES_OPTIONS, HAIR_CONCERNS_OPTIONS } from '../constants'; // For a more generic advisor in future
import { generateSkincareRoutine } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const GeminiSkincareAdvisor: React.FC = () => {
  const [skinType, setSkinType] = useState<SkinType>(SkinType.NORMAL);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [routine, setRoutine] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const availableConcerns = ['Acné', 'Envejecimiento', 'Sequedad', 'Rojeces', 'Manchas Oscuras', 'Poros Dilatados', 'Piel Apagada'];
  const availablePreferences = ['Ingredientes Naturales', 'Vegano', 'Sin Fragancia', 'Texturas Ligeras'];

  const handleConcernToggle = (concern: string) => {
    setConcerns(prev => 
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  const handlePreferenceToggle = (preference: string) => {
    setPreferences(prev =>
      prev.includes(preference) ? prev.filter(p => p !== preference) : [...prev, preference]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRoutine(null);
    try {
      const result = await generateSkincareRoutine(skinType, concerns, preferences);
      setRoutine(result);
    } catch (err: any) {
      setError(err.message || "Un error desconocido ocurrió.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-neutral-800 mb-2 font-serif">Asesor de Cuidado de la Piel con IA</h1>
      <p className="text-neutral-600 mb-8">
        Obtén una rutina de cuidado de la piel personalizada, generada por nuestra IA (Gemini de Google).
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-6">
        <div>
          <label htmlFor="skinType" className="block text-sm font-semibold text-neutral-700 mb-1">Tu Tipo de Piel:</label>
          <select
            id="skinType"
            value={skinType}
            onChange={(e) => setSkinType(e.target.value as SkinType)}
            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
          >
            {SKIN_TYPES_OPTIONS.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <span className="block text-sm font-semibold text-neutral-700 mb-2">Principales Preocupaciones (selecciona varias si aplica):</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableConcerns.map(concern => (
              <button
                type="button"
                key={concern}
                onClick={() => handleConcernToggle(concern)}
                className={`p-3 border rounded-lg text-sm transition-all duration-200
                  ${concerns.includes(concern) 
                    ? 'bg-primary text-white border-primary ring-2 ring-primary ring-offset-1' 
                    : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-primary hover:bg-primary/10'}`}
              >
                {concern}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-sm font-semibold text-neutral-700 mb-2">Preferencias Adicionales (opcional):</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availablePreferences.map(preference => (
              <button
                type="button"
                key={preference}
                onClick={() => handlePreferenceToggle(preference)}
                className={`p-3 border rounded-lg text-sm transition-all duration-200
                  ${preferences.includes(preference) 
                    ? 'bg-secondary text-white border-secondary ring-2 ring-secondary ring-offset-1' 
                    : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-secondary hover:bg-secondary/10'}`}
              >
                {preference}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:opacity-90 transition duration-300 text-lg disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? <LoadingSpinner /> : 'Obtener Rutina Personalizada'}
        </button>
      </form>

      {error && <p className="mt-6 text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

      {routine && (
        <div className="mt-8 p-6 bg-neutral-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">Tu Rutina Personalizada:</h2>
          <div className="whitespace-pre-wrap text-neutral-700 leading-relaxed prose max-w-none">
            {/* Using a div with prose for better formatting of Gemini's markdown-like output */}
            {routine.split('\n').map((line, index) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={index} className="text-xl font-semibold text-neutral-800 mt-3 mb-1">{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.match(/^\d+\.\s+/)) {
                     return <p key={index} className="ml-4 my-1">{line}</p>;
                }
                return <p key={index} className="my-1">{line}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiSkincareAdvisor;
