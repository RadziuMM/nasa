import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photos')
export class PhotosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sub_id: string;

  @Column()
  sol: string;
  //
  @Column()
  camera_id: string;

  @Column()
  camera_name: string;

  @Column()
  camera_rover_id: string;

  @Column()
  camera_full_name: string;
  //
  @Column()
  img_src: string;

  @Column()
  erth_date: string;
  //
  @Column()
  rover_id: string;

  @Column()
  rover_name: string;

  @Column()
  rover_landing_date: string;

  @Column()
  rover_lunch_date: string;

  @Column()
  rover_status: string;
  //
}
