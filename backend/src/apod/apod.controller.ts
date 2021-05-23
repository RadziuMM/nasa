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

import { ApodService } from './apod.service';
import { ApodDTO } from './apod.dto';

@Controller('apod')
export class ApodController {
  constructor(private apodService: ApodService) {}

  @Get()
  async showAllApod() {
    const apod = await this.apodService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Apod fetched successfully',
      apod,
    };
  }

  @Post()
  async createApod(@Body() data: ApodDTO) {
    const apod = await this.apodService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Apod added successfully',
      apod,
    };
  }

  @Get(':id')
  async readApod(@Param('id') id: number) {
    const data = await this.apodService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Apod fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async uppdateApod(@Param('id') id: number, @Body() data: Partial<ApodDTO>) {
    await this.apodService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Apod updated successfully',
    };
  }

  @Delete(':id')
  async deleteApod(@Param('id') id: number) {
    await this.apodService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Apod deleted successfully',
    };
  }
}
