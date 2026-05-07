import { Injectable, Logger } from '@nestjs/common';
import Groq from 'groq-sdk';

interface Classification {
  category: string;
  description: string;
}

interface ExistingVenue {
  id: string;
  name: string;
}

interface VenueAnalysis extends Classification {
  isDuplicate: boolean;
  confidence: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  private cleanJson(text: string): string {
    return text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
  }

  async analyzeVenue(
    newName: string,
    location: string,
    existingVenues: ExistingVenue[],
  ): Promise<VenueAnalysis> {
    const prompt = `
Tenés esta lista de venues ya registrados:
${JSON.stringify(existingVenues.map((v) => v.name))}

Analizá este nuevo venue:

Nombre: "${newName}"
Dirección: "${location}"

1. Detectá si es duplicado.
2. Si no lo es, clasificá el venue.

Categorías posibles:
'bar' | 'club' | 'pub' | 'nightclub' | 'lounge' | 'cafe';

Respondé SOLO con JSON:

{
  "isDuplicate": true o false,
  "confidence": "high|medium|low",
  "category": "categoría",
  "description": "descripción breve"
}
`;

    try {
      const response = await this.groq.chat.completions.create({
        model: process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant',
        temperature: 0.1,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = response.choices[0]?.message?.content ?? '';

      const cleanText = this.cleanJson(content);

      return JSON.parse(cleanText) as VenueAnalysis;
    } catch (error) {
      this.logger.error(`Error Groq: ${String(error)}`);

      return {
        isDuplicate: false,
        confidence: 'low',
        category: 'otro',
        description: 'Sin descripción disponible.',
      };
    }
  }
}
