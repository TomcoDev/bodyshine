import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_MODEL_NAME } from '../constants';
import { SkinType } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

export const generateSkincareRoutine = async (
  skinType: SkinType,
  concerns: string[],
  preferences: string[]
): Promise<string> => {
  if (!API_KEY) return "Error: VITE_API_KEY no configurada.";

  try {
    // Usamos Gemini 3.0 desde las constantes
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

    const prompt = `Actúa como dermatólogo experto. Genera una rutina para:
    Tipo de piel: ${skinType}
    Preocupaciones: ${concerns.join(', ')}
    Preferencias: ${preferences.join(', ') || 'Ninguna'}
    Responde en español, con formato claro de Mañana y Noche.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Error Gemini 3.0:", error);
    return "Error al conectar con la inteligencia de Gemini 3.0.";
  }
};

export const getIngredientInfo = async (ingredientName: string): Promise<string> => {
  if (!API_KEY) return "Error: VITE_API_KEY no configurada.";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.0-flash" });
    const prompt = `Explica el ingrediente cosmético "${ingredientName}" de forma concisa (2-3 frases) en español.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return `No se pudo obtener información de ${ingredientName} con Gemini 3.0.`;
  }
};