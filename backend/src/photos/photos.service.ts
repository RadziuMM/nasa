import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

//collect data
const request = async (rover, date, camera, page, photos) => {
  let done = false;
  return await axios
    .get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}${camera}&page=${page}&api_key=${process.env.KEY}`,
    )
    .then(async (response) => {
      response.data.photos.forEach((element) => {
        photos.push(element);
      });
      if (response.data.photos.length === 0) done = true;
      if (!done) {
        return await request(rover, date, camera, page + 1, photos);
      }
      return await photos;
    })
    .catch((error) => console.log(error));
};

@Injectable()
export class PhotosService {
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
      return await 'You have entered the wrong data!';
    }
    return await request(rover, date, camera, 1, []);
  }
}
