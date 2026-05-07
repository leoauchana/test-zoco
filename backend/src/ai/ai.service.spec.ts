import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;

  const mockGroqCreate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    process.env.GROQ_API_KEY = 'fake-api-key';

    service = new AiService();

    (service as any).logger = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
    };

    (service as any).groq = {
      chat: {
        completions: {
          create: mockGroqCreate,
        },
      },
    };
  });

  describe('analyzeVenue', () => {
    it('should parse AI response successfully', async () => {
      mockGroqCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: JSON.stringify({
                isDuplicate: false,
                confidence: 'high',
                category: 'bar',
                description: 'Bar nocturno',
              }),
            },
          },
        ],
      });

      const result = await service.analyzeVenue('Antares', 'Tucumán', []);

      expect(result).toEqual({
        isDuplicate: false,
        confidence: 'high',
        category: 'bar',
        description: 'Bar nocturno',
      });
    });

    it('should clean markdown JSON before parsing', async () => {
      mockGroqCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: `\`\`\`json
{
  "isDuplicate": true,
  "confidence": "medium",
  "category": "pub",
  "description": "Pub céntrico"
}
\`\`\``,
            },
          },
        ],
      });

      const result = await service.analyzeVenue('Mock Venue', 'Tucumán', []);

      expect(result.isDuplicate).toBe(true);
      expect(result.category).toBe('pub');
    });

    it('should return fallback response if Groq fails', async () => {
      mockGroqCreate.mockRejectedValue(new Error('API Error'));

      const result = await service.analyzeVenue('Mock Venue', 'Tucumán', []);

      expect(result).toEqual({
        isDuplicate: false,
        confidence: 'low',
        category: 'otro',
        description: 'Sin descripción disponible.',
      });
    });
  });
});
