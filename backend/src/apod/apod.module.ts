import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApodController } from './apod.controller';
import { ApodEntity } from './apod.entity';
import { ApodService } from './apod.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApodEntity])],
  controllers: [ApodController],
  providers: [ApodService],
  exports: [ApodService],
})
export class ApodModule {}
