
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      <p className="ml-3 text-neutral-600">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;
