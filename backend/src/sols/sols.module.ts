import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolsController } from './sols.controller';
import { SolsEntity } from './sols.entity';
import { SolsService } from './sols.service';

@Module({
  imports: [TypeOrmModule.forFeature([SolsEntity])],
  controllers: [SolsController],
  providers: [SolsService],
  exports: [SolsService],
})
export class SolsModule {}
