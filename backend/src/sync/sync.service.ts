import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AiService } from 'src/ai/ai.service';
import type { ILogsService } from 'src/logs/interfaces/logs.service.interface';
import { CreateVenueDto } from 'src/venues/dto/create-venues.dto';
import type { IVenuesService } from 'src/venues/interfaces/venues.service.interface';
import { VENUES_MOCK } from './data/venues.mock';
import { ISyncService } from './interfaces/sync.service.interface';

@Injectable()
export class SyncService implements ISyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    @Inject('IVenuesService')
    private readonly venuesService: IVenuesService,
    @Inject('ILogsService')
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

    // Traer todos los venues existentes para comparar

    const existings = await this.venuesService.findAll();

    const venuesForCheck = existings.map((v) => ({
      id: v.id,
      name: v.name,
    }));

    const randomVenues = [...VENUES_MOCK]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    for (const mock of randomVenues) {
      const analysis = await this.aiService.analyzeVenue(
        mock.name,
        mock.location,
        venuesForCheck,
      );
      // 1. Detectar duplicado con IA
      // const isDuplicate = await this.aiService.detectDuplicate(
      //   mock.name,
      //   venuesForCheck,
      // );

      // if (isDuplicate) {
      //   this.logger.warn(`Duplicado detectado: ${mock.name}`);
      //   duplicates++;
      //   continue;
      // }
      if (analysis.isDuplicate && analysis.confidence !== 'low') {
        duplicates++;
        continue;
      }

      // 2. Clasificar con IA
      // const clasification = await this.aiService.classify(
      //   mock.name,
      //   mock.location,
      // );

      const newVenue: CreateVenueDto = {
        name: mock.name,
        location: mock.location,
        source: mock.source,
        category: analysis.category,
        description: analysis.description,
      };

      // 3. Guardar en BD
      await this.venuesService.create(newVenue);

      this.logger.log(`New venue added: ${mock.name}`);
      news++;
    }

    // 4. Guardar log
    await this.logsService.create('sync', news, duplicates);

    this.logger.log(`Sync completo: ${news} nuevos, ${duplicates} duplicados`);
    return { news, duplicates };
  }

  async getLogs() {
    return await this.logsService.findAll();
  }
}
