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
import { SolsService } from './sols.service';
import { SolsDTO } from './sols.dto';

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

  @Post()
  async createSols(@Body() data: SolsDTO) {
    const sol = await this.solsService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sol created successfully',
      sol,
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

  @Patch(':id')
  async uppdateSol(@Param('id') id: number, @Body() data: Partial<SolsDTO>) {
    await this.solsService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sol updated successfully',
    };
  }

  @Delete(':id')
  async deleteSol(@Param('id') id: number) {
    await this.solsService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sol deleted successfully',
    };
  }
}
