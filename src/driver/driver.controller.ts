// driver.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Query,
  Param,
} from '@nestjs/common';
import { DriverService } from 'src/driver/driver.service';
import { CreateDriverDto, FindDriverDto } from 'src/validation/driver.dto';
import { Driver } from './driver.entity';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('/')
  async getAll(@Query() query: FindDriverDto): Promise<Driver[]> {
    return await this.driverService.findAll(query);
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Driver | null> {
    return await this.driverService.findOne(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async create(@Body() createDriverDto: CreateDriverDto): Promise<Driver> {
    return await this.driverService.create(createDriverDto);
  }
}
