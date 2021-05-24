import { Controller, Get, Param, HttpStatus } from '@nestjs/common';
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

  @Get(':id')
  async readSol(@Param('id') id: number) {
    const data = await this.solsService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sol fetched successfully',
      data,
    };
  }
}
