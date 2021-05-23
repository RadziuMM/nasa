import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';

import { PhotosService } from './photos.service';
import { PhotosDTO } from './photos.dto';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get()
  async showAllPhotos() {
    const photo = await this.photosService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Photos fetched successfully',
      photo,
    };
  }

  @Post()
  async createPhotos(@Body() data: PhotosDTO) {
    const photo = await this.photosService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Photo created successfully',
      photo,
    };
  }

  @Get(':id')
  async readPhoto(@Param('id') id: number) {
    const data = await this.photosService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Photo fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async uppdatePhoto(
    @Param('id') id: number,
    @Body() data: Partial<PhotosDTO>,
  ) {
    await this.photosService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Photo updated successfully',
    };
  }

  @Delete(':id')
  async deletePhoto(@Param('id') id: number) {
    await this.photosService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Photo deleted successfully',
    };
  }
}
