import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apod')
export class ApodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  copyright: string;

  @Column()
  date: string;

  @Column()
  explanation: string;

  @Column()
  hdurl: string;

  @Column()
  media_type: string;

  @Column()
  service_version: string;

  @Column()
  title: string;

  @Column()
  url: string;
}
