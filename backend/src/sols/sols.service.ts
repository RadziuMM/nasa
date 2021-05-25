import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { SolsEntity } from './sols.entity';
import axios from 'axios';

@Injectable()
export class SolsService {
  constructor(
    @InjectRepository(SolsEntity)
    private usersRepository: Repository<SolsEntity>,
  ) {}

  async showAll() {
    return await this.usersRepository.find();
  }

  async updateDB() {
    let data_sols;
    const packed_sols_data = [];
    // clear DB
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
            // Save new data on DB
            getConnection()
              .createQueryBuilder()
              .insert()
              .into('sols')
              .values(packed_sols_data)
              .execute();
          })
          .then(() => console.log('Sols DB updated successfully!'))
          .catch((error) => console.log(error));
      });
  }
}
