import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';

const updateDB = () => {
  console.log('xx');
};
@Injectable()
export class SchedulerService extends NestSchedule {
  @Cron('0 0 * * *') // Run every day at 12:00am
  scheduledJob() {
    updateDB();
  }
}

updateDB(); // Run on start
