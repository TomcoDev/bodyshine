
import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';
import { SkinType } from '../types';

// IMPORTANT: Uses Vite's environment variables.
// Ensure VITE_API_KEY is defined in your .env file in the project root.
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.warn("API_KEY (VITE_API_KEY) no está configurada. Las funciones de IA generativa no funcionarán.");
}

// The GoogleGenAI constructor expects apiKey to be a string.
// If API_KEY is undefined, passing it directly would cause an error.
// The fallback "FALLBACK_KEY..." is a placeholder to prevent init crash,
// but the actual API calls are guarded by `if (!API_KEY)` checks below.
const ai = new GoogleGenAI({ apiKey: API_KEY || "FALLBACK_KEY_IF_NOT_SET_WARN_USER" });

export const generateSkincareRoutine = async (
  skinType: SkinType,
  concerns: string[],
  preferences: string[]
): Promise<string> => {
  if (!API_KEY) { // This check prevents API calls if the key is truly missing
    return "Error: La API Key de Gemini no está configurada. Por favor, asegúrate de que VITE_API_KEY esté definida en tu archivo .env.";
  }
  try {
    const prompt = `Eres un experto en cuidado de la piel. Genera una rutina de cuidado de la piel diaria personalizada para alguien con las siguientes características:
Tipo de piel: ${skinType}
Preocupaciones principales: ${concerns.join(', ')}
Preferencias adicionales: ${preferences.join(', ') || 'Ninguna preferencia específica'}

La rutina debe incluir pasos para la mañana y la noche. Sugiere tipos de productos genéricos para cada paso (ej. limpiador suave, sérum antioxidante, crema hidratante ligera, protector solar SPF 30+).
Mantén la rutina concisa, fácil de seguir y en español.
Formatea la respuesta claramente, separando la rutina de mañana y de noche.
Ejemplo de formato:
**Rutina de Mañana:**
1.  Limpiador: [Tipo de limpiador]
2.  Sérum: [Tipo de sérum]
3.  Hidratante: [Tipo de hidratante]
4.  Protector Solar: [Tipo de protector solar]

**Rutina de Noche:**
1.  Desmaquillante (si aplica): [Tipo de desmaquillante]
2.  Limpiador: [Tipo de limpiador]
3.  Tratamiento (opcional): [Tipo de tratamiento para preocupaciones]
4.  Hidratante: [Tipo de hidratante]`;

    const response = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
    });
    
    return response.text || 'No se pudo generar una respuesta.';

  } catch (error) {
    console.error("Error al generar rutina de cuidado de la piel:", error);
    let errorMessage = "Lo sentimos, ha ocurrido un error al generar tu rutina personalizada. Por favor, inténtalo de nuevo más tarde.";
    if (error instanceof Error && error.message.includes('API key not valid')) {
        errorMessage = "Error: La API Key de Gemini no es válida. Por favor, verifica tu VITE_API_KEY.";
    } else if (error instanceof Error) {
        errorMessage += ` Detalle: ${error.message}`;
    }
    return errorMessage;
  }
};


export const getIngredientInfo = async (ingredientName: string): Promise<string> => {
  if (!API_KEY) { // This check prevents API calls if the key is truly missing
    return "Error: La API Key de Gemini no está configurada. Por favor, asegúrate de que VITE_API_KEY esté definida en tu archivo .env.";
  }
  try {
    const prompt = `Proporciona una breve descripción del ingrediente cosmético "${ingredientName}". Incluye su función principal, posibles beneficios y cualquier preocupación de seguridad común o si generalmente se considera seguro o "limpio". Responde en español y sé conciso (2-3 frases).`;
    
    const response = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
    });
    return response.text || 'No se pudo obtener información.';
  } catch (error) {
    console.error(`Error al obtener información del ingrediente ${ingredientName}:`, error);
    let errorMessage = `No se pudo obtener información para ${ingredientName}.`;
     if (error instanceof Error && error.message.includes('API key not valid')) {
        errorMessage = "Error: La API Key de Gemini no es válida. Por favor, verifica tu VITE_API_KEY.";
    } else if (error instanceof Error) {
        errorMessage += ` Detalle: ${error.message}`;
    }
    return errorMessage;
  }
};