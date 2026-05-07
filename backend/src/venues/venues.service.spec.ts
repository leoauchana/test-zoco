import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { VenuesMapper } from './mappers/venue.mapper';
import { VENUES_REPOSITORY } from './venues.constants';
import { VenuesService } from './venues.service';

describe('VenuesService', () => {
  let service: VenuesService;

  const mockVenue = {
    id: 'venue-1',
    name: 'Antares',
    location: 'Tucumán',
    category: 'Bar',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    count: jest.fn(),
  };

  const mockMapper = {
    toPrismaToResponse: jest.fn(),
    toPrismaToResponseArray: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VenuesService,
        {
          provide: VENUES_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: VenuesMapper,
          useValue: mockMapper,
        },
      ],
    }).compile();

    service = module.get<VenuesService>(VenuesService);
  });

  describe('findAll', () => {
    it('should return paginated venues', async () => {
      mockRepository.count.mockResolvedValue(1);
      mockRepository.findAll.mockResolvedValue([mockVenue]);

      mockMapper.toPrismaToResponseArray.mockReturnValue([mockVenue]);

      const result = await service.findAll(1, 10);

      expect(mockRepository.count).toHaveBeenCalled();
      expect(mockRepository.findAll).toHaveBeenCalledWith(1, 10, undefined);

      expect(result).toEqual({
        data: [mockVenue],
        total: 1,
      });
    });

    it('should throw error if page is invalid', async () => {
      await expect(service.findAll(0, 10)).rejects.toThrow(BadRequestException);
    });
  });

  describe('create', () => {
    it('should create a venue successfully', async () => {
      mockRepository.findAll.mockResolvedValue([]);
      mockRepository.create.mockResolvedValue(mockVenue);

      mockMapper.toPrismaToResponse.mockReturnValue(mockVenue);

      const result = await service.create({
        name: 'Antares',
        location: 'Tucumán',
        category: 'Bar',
        description: 'Cervecería artesanal',
        source: 'manual',
      });

      expect(mockRepository.create).toHaveBeenCalled();

      expect(result).toEqual(mockVenue);
    });

    it('should throw error if venue already exists', async () => {
      mockRepository.findAll.mockResolvedValue([mockVenue]);

      await expect(
        service.create({
          name: 'Antares',
          location: 'Tucumán',
          category: 'Bar',
          description: 'Cervecería artesanal',
          source: 'manual',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update venue successfully', async () => {
      mockRepository.findOne.mockResolvedValue(mockVenue);

      mockRepository.findAll.mockResolvedValue([mockVenue]);

      mockRepository.update.mockResolvedValue({
        ...mockVenue,
        name: 'Antares Premium',
      });

      mockMapper.toPrismaToResponse.mockReturnValue({
        ...mockVenue,
        name: 'Antares Premium',
      });

      const result = await service.update('venue-1', {
        name: 'Antares Premium',
      });

      expect(mockRepository.update).toHaveBeenCalled();

      expect(result.name).toBe('Antares Premium');
    });

    it('should throw error if name belongs to another venue', async () => {
      mockRepository.findOne.mockResolvedValue(mockVenue);

      mockRepository.findAll.mockResolvedValue([
        {
          ...mockVenue,
          id: 'venue-2',
          name: 'Duplicate Name',
        },
      ]);

      await expect(
        service.update('venue-1', {
          name: 'Duplicate Name',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('softDelete', () => {
    it('should deactivate venue successfully', async () => {
      mockRepository.findOne.mockResolvedValue(mockVenue);

      mockRepository.softDelete.mockResolvedValue({
        ...mockVenue,
        active: false,
      });

      mockMapper.toPrismaToResponse.mockReturnValue({
        ...mockVenue,
        active: false,
      });

      const result = await service.softDelete('venue-1');

      expect(mockRepository.softDelete).toHaveBeenCalledWith('venue-1');

      expect(result.active).toBe(false);
    });

    it('should throw error if venue is already deactivated', async () => {
      mockRepository.findOne.mockResolvedValue({
        ...mockVenue,
        active: false,
      });

      await expect(service.softDelete('venue-1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
