import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApodModule } from './apod/apod.module';
import { PhotosModule } from './photos/photos.module';
import { SolsModule } from './sols/sols.module';
import { database } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: database.host,
      port: database.portdb as unknown as number,
      username: database.username,
      password: database.password,
      database: database.database,
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      logging: false,
    }),
    ApodModule,
    PhotosModule,
    SolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
