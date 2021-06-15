import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { nasaAPI } from '../config';

@Injectable()
export class PhotosService {
  //collect data
  request = async (
    rover: string,
    date: string,
    camera: string,
    page: number,
  ) => {
    const { data } = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}${camera}&page=${page}&api_key=${nasaAPI.key}`,
    );
    return data.photos;
  };
  async sendPhotos(data: { date: string; rover: string; camera: string }) {
    const date = data.date ?? 'wrong';
    const rover = data.rover ?? 'wrong';
    let camera = data.camera ?? 'all'; //optional
    //data validation
    if (
      rover.match(/^(curiosity|opportunity|spirit)$/) &&
      camera.match(
        /^(fhaz|rhaz|mast|chemcam|mahli|mardi|navcam|pancam|minites|all)$/,
      ) &&
      date.match(/^\d{4}([-])\d{2}\1\d{2}$/)
    ) {
      if (camera !== 'all') {
        camera = `&camera=${camera}`;
      } else {
        camera = '';
      }
    } else {
      throw new BadRequestException('You have entered the wrong data!');
    }
    return await this.request(rover, date, camera, 1);
  }
}
