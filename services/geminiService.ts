import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_MODEL_NAME } from '../constants';
import { SkinType } from '../types';

// Usamos la variable de entorno estándar de Vite
const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

/**
 * Genera una rutina de cuidado de la piel personalizada.
 */
export const generateSkincareRoutine = async (
  skinType: SkinType,
  concerns: string[],
  preferences: string[]
): Promise<string> => {
  if (!API_KEY) return "Error: VITE_API_KEY no configurada en el entorno.";

  try {
    // Usamos el modelo definido en constants.ts
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

    const prompt = `Actúa como dermatólogo experto. Genera una rutina diaria para:
    Tipo de piel: ${skinType}
    Preocupaciones: ${concerns.join(', ')}
    Preferencias: ${preferences.join(', ') || 'Ninguna'}
    Responde en español, con formato claro para Mañana y Noche.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Error Gemini IA (Routine):", error);
    return "Lo sentimos, ocurrió un error al conectar con la inteligencia de Gemini.";
  }
};

/**
 * Obtiene información detallada sobre un ingrediente cosmético.
 */
export const getIngredientInfo = async (ingredientName: string): Promise<string> => {
  if (!API_KEY) return "Error: VITE_API_KEY no configurada en el entorno.";

  try {
    // CORRECCIÓN: Usamos GEMINI_MODEL_NAME aquí también para evitar el error 404
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });
    
    const prompt = `Actúa como experto en química cosmética. 
    Explica el ingrediente "${ingredientName}" de forma concisa (2-3 frases) en español. 
    Incluye su función principal y si se considera seguro.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error(`Error Gemini IA (Ingredient - ${ingredientName}):`, error);
    return `No se pudo obtener información detallada de ${ingredientName} en este momento.`;
  }
};