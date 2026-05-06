import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venues.dto';
import { QueryVenuesDto } from './dto/query-vanues.dto';
import { UpdateVenueDto } from './dto/update-venues.dto';
import type { IVenuesService } from './interfaces/venues.service.interface';

@Controller('venues')
export class VenuesController {
  constructor(
    @Inject('IVenuesService')
    private readonly venuesService: IVenuesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createVenueDto: CreateVenueDto) {
    console.log('Creating venue...');
    return {
      data: await this.venuesService.create(createVenueDto),
      message: 'Local creado exitosamente',
    };
  }

  @Get()
  async findAll(@Query() queryDto: QueryVenuesDto) {
    const { page, limit, actives } = queryDto;
    const activosFilter =
      actives === 'true' ? true : actives === 'false' ? false : undefined;
    return {
      success: true,
      data: await this.venuesService.findAll(page, limit, activosFilter),
    };
  }

  @Get('category/:categoria')
  async findByCategory(
    @Param('categoria') category: string,
    @Query() queryDto: QueryVenuesDto,
  ) {
    const { page, limit } = queryDto;
    return {
      success: true,
      data: await this.venuesService.findByCategory(category, page, limit),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return {
      data: await this.venuesService.findOne(id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVenueDto: UpdateVenueDto,
  ) {
    return {
      data: await this.venuesService.update(id, updateVenueDto),
      message: 'Local actualizado exitosamente',
    };
  }

  @Patch(':id/desactivate')
  async desactivate(@Param('id') id: string) {
    await this.venuesService.softDelete(id);
    return {
      message: 'Venue deleted successfully',
    };
  }
}
