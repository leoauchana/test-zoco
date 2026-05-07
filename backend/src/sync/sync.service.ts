import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AiService } from '../ai/ai.service';
import { ILogsService } from '../logs/interfaces/logs.service.interface';
import { LOGS_SERVICE } from '../logs/logs.constants';
import { CreateVenueDto } from '../venues/dto/create-venues.dto';
import { IVenuesService } from '../venues/interfaces/venues.service.interface';
import { VENUES_SERVICE } from '../venues/venues.constants';
import { VENUES_MOCK } from './data/venues.mock';
import { ISyncService } from './interfaces/sync.service.interface';

@Injectable()
export class SyncService implements ISyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    @Inject(VENUES_SERVICE)
    private readonly venuesService: IVenuesService,
    @Inject(LOGS_SERVICE)
    private readonly logsService: ILogsService,
    private readonly aiService: AiService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.log('Cron ejecutado automáticamente');
    await this.run();
  }

  async run(): Promise<{ news: number; duplicates: number }> {
    this.logger.log('Iniciando sincronización...');

    let news = 0;
    let duplicates = 0;

    const existings = await this.venuesService.findAll();

    const venuesForCheck = existings.data.map((v) => ({
      id: v.id,
      name: v.name,
    }));

    const randomVenues = [...VENUES_MOCK]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    for (const mock of randomVenues) {
      const analysis = await this.aiService.analyzeVenue(
        mock.name,
        mock.location,
        venuesForCheck,
      );

      if (analysis.isDuplicate && analysis.confidence !== 'low') {
        duplicates++;
        continue;
      }

      const newVenue: CreateVenueDto = {
        name: mock.name,
        location: mock.location,
        source: mock.source,
        category: analysis.category,
        description: analysis.description,
      };
      try {
        await this.venuesService.create(newVenue);
        this.logger.log(`Nuevo venue agregado: ${mock.name}`);
        news++;
      } catch (error) {
        if (error instanceof ConflictException) {
          this.logger.warn(`Duplicado detectado al guardar: ${mock.name}`);
          duplicates++;
        } else {
          // Otro error, lo re-lanzamos
          throw error;
        }
      }
    }

    await this.logsService.create('sync', news, duplicates);

    this.logger.log(`Sync completo: ${news} nuevos, ${duplicates} duplicados`);
    return { news, duplicates };
  }

  async getLogs() {
    return await this.logsService.findAll();
  }
}
