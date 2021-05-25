import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { SolsService } from './sols/sols.service';
import { ApodService } from './apod/apod.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppService extends NestSchedule {
  @Cron('0 0 * * *') // Run every day at 12:00am
  scheduledJob() {
    this.updateDB();
  }

  constructor(
    private solsService: SolsService,
    private apodService: ApodService,
  ) {
    super();
    this.updateDB(); //Run on start
  }
  updateDB = () => {
    this.solsService.updateDB();
    this.apodService.updateDB();
  };
}
