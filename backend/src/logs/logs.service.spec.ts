import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { LogResponseDto } from './dto/response-logs.dto';
import { LOGS_REPOSITORY } from './logs.constants';
import { LogsService } from './logs.service';

describe('LogsService', () => {
  let service: LogsService;

  const mockLog = {
    id: 'log-1',
    action: 'SCRAPING_COMPLETED',
    newCount: 10,
    duplicates: 2,
    createdAt: new Date(),
  };

  const mockRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: LOGS_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LogsService>(LogsService);
  });

  describe('findAll', () => {
    it('should return all logs', async () => {
      mockRepository.findAll.mockResolvedValue([mockLog]);

      jest
        .spyOn(LogResponseDto, 'fromPrismaArray')
        .mockReturnValue([mockLog as any]);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();

      expect(result).toEqual([mockLog]);
    });
  });

  describe('findOne', () => {
    it('should return one log', async () => {
      mockRepository.findOne.mockResolvedValue(mockLog);

      jest.spyOn(LogResponseDto, 'fromPrisma').mockReturnValue(mockLog as any);

      const result = await service.findOne('log-1');

      expect(mockRepository.findOne).toHaveBeenCalledWith('log-1');

      expect(result).toEqual(mockLog);
    });

    it('should throw if log does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a log successfully', async () => {
      mockRepository.create.mockResolvedValue(undefined);

      await service.create('SCRAPING_COMPLETED', 10, 2);

      expect(mockRepository.create).toHaveBeenCalledWith(
        'SCRAPING_COMPLETED',
        10,
        2,
      );
    });

    it('should propagate repository errors', async () => {
      mockRepository.create.mockRejectedValue(new Error('Database error'));

      await expect(service.create('SCRAPING_COMPLETED', 10, 2)).rejects.toThrow(
        'Database error',
      );
    });
  });
});
