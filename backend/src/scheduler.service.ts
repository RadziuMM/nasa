import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { getConnection } from 'typeorm';
import axios from 'axios';
import { SolsService } from './sols/sols.service';

@Injectable()
export class SchedulerService extends NestSchedule {
  @Cron('0 0 * * *') // Run every day at 12:00am
  scheduledJob() {
    this.updateDB();
  }

  constructor(private solsService: SolsService) {
    super();
    this.updateDB(); //Run on start
  }
  updateDB = () => {
    // SOLS
    let data_sols;
    const packed_sols_data = [];
    getConnection()
      .createQueryBuilder()
      .delete()
      .from('sols')
      .execute()
      .then(() => {
        axios
          .get(
            'https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json',
          )
          .then((response) => (data_sols = response.data.sols))
          .then(() => {
            data_sols.forEach((element) => {
              packed_sols_data.push({
                id: 0,
                terrestrial_date: element.terrestrial_date,
                sol: element.sol,
                ls: element.ls,
                season: element.season,
                min_temp: element.min_temp,
                max_temp: element.max_temp,
                pressure: element.pressure,
                sunrise: element.sunrise,
                sunset: element.sunset,
              });
            });
          })
          .then(() => {
            getConnection()
              .createQueryBuilder()
              .insert()
              .into('sols')
              .values(packed_sols_data)
              .execute();
          })
          .then(() => console.log('sols fetched sucessful'))
          .catch((error) => console.log(error));
      });
    // APOD
    let data_apod;
    const packed_apod_data = [];
    let date: any = new Date();
    const pastDate = date.getDate() - 99;
    date.setDate(pastDate);
    date = date.toISOString().split('T')[0];
    getConnection()
      .createQueryBuilder()
      .delete()
      .from('apod')
      .execute()
      .then(() => {
        axios
          .get(
            `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${date}`,
          )
          .then((response) => (data_apod = response.data))
          .then(() => {
            data_apod.forEach((element) => {
              packed_apod_data.push({
                id: 0,
                copyright: element.copyright,
                date: element.date,
                explanation: element.explanation,
                hdurl: element.hdurl,
                media_type: element.media_type,
                title: element.title,
                service_version: element.service_version,
                url: element.url,
              });
            });
          })
          .then(() => {
            getConnection()
              .createQueryBuilder()
              .insert()
              .into('apod')
              .values(packed_apod_data)
              .execute();
          })
          .then(() => console.log('apod fetched sucessful'))
          .catch((error) => console.log(error));
      });
    // PHOTOS
  };
}
