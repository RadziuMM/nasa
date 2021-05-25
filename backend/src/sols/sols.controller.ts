import { Controller, Get, HttpStatus } from '@nestjs/common';
import { SolsService } from './sols.service';

@Controller('sols')
export class SolsController {
  constructor(private solsService: SolsService) {}

  @Get()
  async showAllSols() {
    const sols = await this.solsService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Sols fetched successfully',
      sols,
    };
  }
}
