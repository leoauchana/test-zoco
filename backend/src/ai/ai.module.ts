import { Module } from '@nestjs/common';
import { AI_SERVICE } from './ai.constants';
import { AiService } from './ai.service';
@Module({
  providers: [
    {
      provide: AI_SERVICE,
      useClass: AiService,
    },
  ],
  exports: [AI_SERVICE],
})
export class AiModule {}
