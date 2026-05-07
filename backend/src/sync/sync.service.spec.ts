import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { LOGS_SERVICE } from '../logs/logs.constants';
import { VENUES_SERVICE } from '../venues/venues.constants';

import { AI_SERVICE } from '../ai/ai.constants';
import { SyncService } from './sync.service';

describe('SyncService', () => {
  let service: SyncService;

  const mockVenuesService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  const mockLogsService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const mockAiService = {
    analyzeVenue: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncService,
        {
          provide: VENUES_SERVICE,
          useValue: mockVenuesService,
        },
        {
          provide: LOGS_SERVICE,
          useValue: mockLogsService,
        },
        {
          provide: AI_SERVICE,
          useValue: mockAiService,
        },
      ],
    }).compile();

    service = module.get<SyncService>(SyncService);

    mockVenuesService.findAll.mockResolvedValue({
      data: [],
      total: 0,
    });
  });

  describe('run', () => {
    it('should sync venues successfully', async () => {
      mockAiService.analyzeVenue.mockResolvedValue({
        isDuplicate: false,
        confidence: 'high',
        category: 'Bar',
        description: 'Lugar gastronómico',
      });

      mockVenuesService.create.mockResolvedValue(undefined);

      const result = await service.run();

      expect(mockVenuesService.create).toHaveBeenCalled();

      expect(mockLogsService.create).toHaveBeenCalled();

      expect(result.news).toBeGreaterThan(0);
    });

    it('should skip duplicate venues detected by AI', async () => {
      mockAiService.analyzeVenue.mockResolvedValue({
        isDuplicate: true,
        confidence: 'high',
      });

      const result = await service.run();

      expect(mockVenuesService.create).not.toHaveBeenCalled();

      expect(result.duplicates).toBeGreaterThan(0);
    });

    it('should count duplicate if create throws ConflictException', async () => {
      mockAiService.analyzeVenue.mockResolvedValue({
        isDuplicate: false,
        confidence: 'high',
        category: 'Bar',
        description: 'Lugar gastronómico',
      });

      mockVenuesService.create.mockRejectedValue(new ConflictException());

      const result = await service.run();

      expect(result.duplicates).toBeGreaterThan(0);
    });

    it('should throw unexpected errors', async () => {
      mockAiService.analyzeVenue.mockResolvedValue({
        isDuplicate: false,
        confidence: 'high',
        category: 'Bar',
        description: 'Lugar gastronómico',
      });

      mockVenuesService.create.mockRejectedValue(new Error('Unexpected error'));

      await expect(service.run()).rejects.toThrow('Unexpected error');
    });
  });

  describe('getLogs', () => {
    it('should return logs', async () => {
      const mockLogs = [
        {
          id: '1',
          action: 'sync',
        },
      ];

      mockLogsService.findAll.mockResolvedValue(mockLogs);

      const result = await service.getLogs();

      expect(mockLogsService.findAll).toHaveBeenCalled();

      expect(result).toEqual(mockLogs);
    });
  });
});
