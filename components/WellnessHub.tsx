
import React from 'react';
import { WellnessTip } from '../types';
import { MOCK_WELLNESS_TIPS } from '../constants';

const WellnessHub: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-neutral-800 mb-2 font-serif">Centro de Bienestar Holístico</h1>
      <p className="text-neutral-600 mb-8">
        Descubre consejos y prácticas para un bienestar integral que se refleje en tu belleza.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_WELLNESS_TIPS.map((tip: WellnessTip) => (
          <div key={tip.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {tip.imageUrl && <img src={tip.imageUrl} alt={tip.title} className="w-full h-56 object-cover" />}
            <div className="p-6">
              <span className="inline-block bg-primary/20 text-primary text-xs font-semibold px-2 py-1 rounded-full mb-2">
                {tip.category}
              </span>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">{tip.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>
       <div className="mt-12 text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
        <h2 className="text-2xl font-semibold text-primary mb-3">Comunidad BodyShine (Próximamente)</h2>
        <p className="text-neutral-700 max-w-xl mx-auto">
            Imagina un espacio para compartir tus rutinas, descubrir tendencias (#HairGoals, #EcoFriendlyBeauty), y conectar con otros amantes de la belleza consciente. ¡Estamos trabajando en ello!
        </p>
      </div>
    </div>
  );
};

export default WellnessHub;
