import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApodEntity } from './apod.entity';
import { ApodDTO } from './apod.dto';

@Injectable()
export class ApodService {
  constructor(
    @InjectRepository(ApodEntity)
    private apodRepository: Repository<ApodEntity>,
  ) {}

  async showAll() {
    return await this.apodRepository.find();
  }

  async create(data: ApodDTO) {
    const apod = this.apodRepository.create(data);
    await this.apodRepository.save(data);
    return apod;
  }

  async findByDate(date: string): Promise<ApodDTO> {
    return await this.apodRepository.findOne({
      where: {
        date: date,
      },
    });
  }

  async read(id: number) {
    return await this.apodRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<ApodDTO>) {
    await this.apodRepository.update({ id }, data);
    return await this.apodRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.apodRepository.delete({ id });
    return { deleted: true };
  }
}
