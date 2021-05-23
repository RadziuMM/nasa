import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sols')
export class SolsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  terrestrial_date: string;

  @Column()
  sol: string;

  @Column()
  ls: string;

  @Column()
  season: string;

  @Column()
  min_temp: string;

  @Column()
  max_temp: string;

  @Column()
  pressure: string;

  @Column()
  sunrise: string;

  @Column()
  sunset: string;
}
