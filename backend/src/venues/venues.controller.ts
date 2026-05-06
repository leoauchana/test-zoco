import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venues.dto';
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
    return {
      success: true,
      data: await this.venuesService.create(createVenueDto),
      message: 'Local creado exitosamente',
    };
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('activos') activos?: string,
  ) {
    const activosFilter =
      activos === 'true' ? true : activos === 'false' ? false : undefined;
    return {
      success: true,
      data: await this.venuesService.findAll(page, limit, activosFilter),
    };
  }

  @Get('category/:categoria')
  async findByCategory(
    @Param('categoria') categoria: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return {
      success: true,
      data: await this.venuesService.findByCategory(categoria, page, limit),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return {
      success: true,
      data: await this.venuesService.findOne(id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVenueDto: UpdateVenueDto,
  ) {
    return {
      success: true,
      data: await this.venuesService.update(id, updateVenueDto),
      message: 'Local actualizado exitosamente',
    };
  }

  @Patch(':id/desactivate')
  async desactivate(@Param('id') id: string) {
    await this.venuesService.softDelete(id);
    return {
      success: true,
      message: 'Venue deleted successfully',
    };
  }
}
