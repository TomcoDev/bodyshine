
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Simple check for API_KEY presence and warning using Vite's env variables.
if (!import.meta.env.VITE_API_KEY) {
  const warningDiv = document.createElement('div');
  warningDiv.innerHTML = `
    <div style="background-color: #fff3cd; color: #856404; padding: 15px; border: 1px solid #ffeeba; text-align: center; font-family: sans-serif;">
      <strong>Advertencia:</strong> La API Key para los servicios de IA (Gemini) no está configurada. 
      Algunas funcionalidades pueden no estar disponibles o no funcionar correctamente. 
      Por favor, asegúrate de que la variable de entorno <code>VITE_API_KEY</code> esté definida en tu archivo .env.
    </div>
  `;
  document.body.prepend(warningDiv);
  console.warn(
    "ADVERTENCIA: La variable de entorno VITE_API_KEY no está configurada. " +
    "Las funcionalidades de IA generativa no funcionarán. " +
    "Asegúrate de configurar `VITE_API_KEY` en tu archivo .env en la raíz del proyecto."
  );
}


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);