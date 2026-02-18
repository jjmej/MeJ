
'use server';
import type { Checkin } from '@/types';
import { getSimpleTextResponse } from './geminiService';

/**
 * Proporciona una interpretación simple basada en el último check-in.
 * En una aplicación real, esto podría ser mucho más complejo.
 */
export async function getCheckinInterpretation(checkin: Checkin): Promise<string> {
  const prompt = `Un atleta joven ha registrado los siguientes datos en su check-in diario:
  - Estado emocional (1=mal, 4=excelente): ${checkin.estado_emoji}
  - Nivel de estrés (1=bajo, 5=alto): ${checkin.nivel_estres}
  - Nivel de energía (1=bajo, 5=alto): ${checkin.nivel_energia}
  - Ganas de entrenar (1=bajas, 5=altas): ${checkin.ganas_entrenar}
  
  Basado en estos datos, proporciona un breve mensaje de ánimo y una sugerencia simple y positiva de no más de 25 palabras. Habla en segunda persona (tú).`;

  try {
    const interpretation = await getSimpleTextResponse(prompt);
    return interpretation;
  } catch (error) {
    console.error("Error getting interpretation:", error);
    return "Recuerda ser constante. ¡Cada día es una nueva oportunidad para mejorar!";
  }
}
