import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { ApodEntity } from './apod.entity';
import axios from 'axios';

@Injectable()
export class ApodService {
  constructor(
    @InjectRepository(ApodEntity)
    private apodRepository: Repository<ApodEntity>,
  ) {}

  async showAll() {
    return await this.apodRepository.find();
  }

  async updateDB() {
    let data_apod;
    const packed_apod_data = [];
    // fetch data only for 100 last days
    let date: any = new Date();
    const pastDate = date.getDate() - 99;
    date.setDate(pastDate);
    date = date.toISOString().split('T')[0];
    // clear DB
    getConnection()
      .createQueryBuilder()
      .delete()
      .from('apod')
      .execute()
      .then(() => {
        axios
          .get(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.KEY}&start_date=${date}`,
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
            // save new data in DB
            getConnection()
              .createQueryBuilder()
              .insert()
              .into('apod')
              .values(packed_apod_data)
              .execute();
          })
          .then(() => console.log('Apod DB updated successfully!'))
          .catch((error) => console.log(error));
      });
  }
}
