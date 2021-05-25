import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApodService } from './apod.service';

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
}
