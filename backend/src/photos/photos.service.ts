import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotosEntity } from './photos.entity';
import { PhotosDTO } from './photos.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotosEntity)
    private photoRepository: Repository<PhotosEntity>,
  ) {}

  async showAll() {
    return await this.photoRepository.find();
  }

  async create(data: PhotosDTO) {
    const photo = this.photoRepository.create(data);
    await this.photoRepository.save(data);
    return photo;
  }

  async findBySol(sol: string): Promise<PhotosDTO> {
    return await this.photoRepository.findOne({
      where: {
        sol: sol,
      },
    });
  }

  async read(id: number) {
    return await this.photoRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<PhotosDTO>) {
    await this.photoRepository.update({ id }, data);
    return await this.photoRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.photoRepository.delete({ id });
    return { deleted: true };
  }
}
