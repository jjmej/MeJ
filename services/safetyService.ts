
'use server';
import { getSimpleTextResponse } from './geminiService';

/**
 * Analiza el texto en busca de posibles señales de alerta.
 * DEV_NOTE: Esta es una simulación. Una implementación real requeriría
 * un modelo de IA entrenado para seguridad y protocolos claros de actuación.
 * @param text El texto a analizar (ej. de una nota libre de check-in).
 * @returns boolean - true si se detecta una posible alerta.
 */
export async function checkForSafetyAlerts(text: string): Promise<boolean> {
  if (!text.trim()) {
    return false;
  }

  const prompt = `Analiza el siguiente texto de un joven deportista. Responde únicamente con "true" si contiene alguna mención directa o indirecta de autolesión, ideación suicida, depresión severa, o abuso, y únicamente con "false" si no la contiene. Texto: "${text}"`;
  
  try {
    const response = await getSimpleTextResponse(prompt);
    // La respuesta del modelo debería ser 'true' o 'false' en texto.
    return response.toLowerCase().includes('true');
  } catch (error) {
    console.error("Safety check failed:", error);
    // En caso de error, es más seguro asumir que no hay alerta.
    return false;
  }
}
