import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolsEntity } from './sols.entity';
import { SolsDTO } from './sols.dto';

@Injectable()
export class SolsService {
  constructor(
    @InjectRepository(SolsEntity)
    private usersRepository: Repository<SolsEntity>,
  ) {}

  async showAll() {
    return await this.usersRepository.find();
  }

  async create(data: SolsDTO) {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(data);
    return user;
  }

  async findBySol(sol: string): Promise<SolsDTO> {
    return await this.usersRepository.findOne({
      where: {
        sol: sol,
      },
    });
  }

  async read(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<SolsDTO>) {
    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }
}
