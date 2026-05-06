import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';

interface Classification {
  category: string;
  description: string;
}

interface ExistingVenue {
  id: string;
  name: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly model;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async detectDuplicate(
    newName: string,
    existingVenues: ExistingVenue[],
  ): Promise<boolean> {
    if (existingVenues.length === 0) return false;

    const prompt = `
Tenés esta lista de bares/venues ya registrados:
${JSON.stringify(existingVenues.map((v) => v.name))}

¿El siguiente venue es probable duplicado de alguno de la lista?
Nuevo venue: "${newName}"

Considerá duplicados aunque el nombre esté en distinto orden, 
tenga palabras extra o falten palabras. 
Ejemplos: "Bar Irlanda" y "Irlanda Bar" son duplicados.
         "El Cairo" y "Bar El Cairo" son duplicados.

Respondé ÚNICAMENTE con un JSON sin texto adicional ni backticks:
{
  "esDuplicado": true o false,
  "confianza": "alta", "media" o "baja"
}
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      const parsed = JSON.parse(text) as {
        isDuplicate: boolean;
        confidence: string;
      };

      this.logger.log(
        `Duplicado check "${newName}": ${parsed.isDuplicate} (confianza: ${parsed.confidence})`,
      );

      return parsed.isDuplicate && parsed.confidence !== 'baja';
    } catch (error) {
      this.logger.error(`Error detectando duplicado: ${String(error)}`);
      return false;
    }
  }

  async classify(name: string, location: string): Promise<Classification> {
    const prompt = `
Dado este bar/venue de Tucumán, Argentina:
Nombre: "${name}"
Dirección: "${location}"

Clasificalo y generá una descripción breve.
Categorías posibles: bar, boliche, café, restaurante, peña, resto-bar, otro

Respondé ÚNICAMENTE con un JSON sin texto adicional ni backticks:
{
  "category": "una de las categorías de arriba",
  "description": "descripción breve de máximo 2 oraciones sobre el lugar"
}
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      const parsed = JSON.parse(text) as Classification;
      return parsed;
    } catch (error) {
      this.logger.error(`Error clasificando venue: ${String(error)}`);
      return {
        category: 'otro',
        description: 'Sin descripción disponible.',
      };
    }
  }
}
