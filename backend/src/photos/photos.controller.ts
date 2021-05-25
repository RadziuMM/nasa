import { Controller, Body, HttpStatus, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post()
  async showPhotos(
    @Body() data: { date: string; rover: string; camera: string },
  ) {
    const photos = await this.photosService.sendPhotos(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Photos fetched successfully',
      photos,
    };
  }
}
