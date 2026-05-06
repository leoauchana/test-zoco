import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AiService } from 'src/ai/ai.service';
import { DatabaseService } from 'src/database/database.service';
import { VENUES_MOCK } from './data/venues.mock';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private readonly databaseService: DatabaseService,
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
    const existings = await this.databaseService.venue.findMany({
      select: { id: true, name: true },
    });

    for (const mock of VENUES_MOCK) {
      // 1. Detectar duplicado con IA
      const isDuplicate = await this.aiService.detectDuplicate(
        mock.name,
        existings,
      );

      if (isDuplicate) {
        this.logger.warn(`Duplicado detectado: ${mock.name}`);
        duplicates++;
        continue;
      }

      // 2. Clasificar con IA
      const clasification = await this.aiService.classify(
        mock.name,
        mock.location,
      );

      // 3. Guardar en BD
      await this.databaseService.venue.create({
        data: {
          name: mock.name,
          location: mock.location,
          source: mock.source,
          category: clasification.category,
          description: clasification.description,
        },
      });

      this.logger.log(`New venue added: ${mock.name}`);
      news++;
    }

    // 4. Guardar log
    await this.databaseService.log.create({
      data: {
        action: 'sync',
        newCount: news,
        duplicates: duplicates,
      },
    });

    this.logger.log(`Sync completo: ${news} nuevos, ${duplicates} duplicados`);
    return { news, duplicates };
  }

  async getLogs() {
    return await this.databaseService.log.findMany({
      orderBy: { executedAt: 'desc' },
      take: 20,
    });
  }
}
